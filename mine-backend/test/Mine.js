const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mine Contract", () => {
	let Mine;
	let mine;
	let admin;
	let certifier;
	let sellerUser;
	let buyerUser;
	let addrs;
	let DEFAULT_ADMIN_ROLE;
	let CERTIFIER_ROLE;
	let USER_ROLE;
	const ONE_GWEI = 1_000_000_000;

	beforeEach(async () => {
		Mine = await ethers.getContractFactory("Mine");
		[admin, certifier, sellerUser, buyerUser, ...addrs] = await ethers.getSigners();
		mine = await Mine.deploy();
		DEFAULT_ADMIN_ROLE = await mine.DEFAULT_ADMIN_ROLE();
		CERTIFIER_ROLE = await mine.CERTIFIER_ROLE();
		USER_ROLE = await mine.USER_ROLE();
	});

	async function registerUser() {
		const userMetadataUrl = "url_metadata";
		await mine.connect(sellerUser).registerUser(userMetadataUrl);
		const newUserRegistered = await mine.connect(sellerUser).users(sellerUser.address);
		return newUserRegistered;
	}

	async function registerCertifier() {
		const certifierMetadataUrl = "url_metadata";
		await mine.connect(certifier).registerAsCertifier(certifierMetadataUrl, {value: ONE_GWEI});
		await mine.connect(certifier).certifiers(certifier.address);
		await mine.connect(admin).acceptCertifier(certifier.address);
	}

	async function safeMint() {
		const to = sellerUser.address;
		const metadataUrl = "metadata";
		const price = 10000;
		const tx = await mine.connect(admin).safeMint(to, metadataUrl, price, {value: ONE_GWEI});
		const events = await tx.wait();
		return events;
	}

	describe("Role Assignments", () => {
		it("ADMIN can add Role to a Certifier", async () => {
			await mine.grantRole(CERTIFIER_ROLE, certifier.address);
			expect(await mine.hasRole(CERTIFIER_ROLE, certifier.address)).to.equal(true);
		});

		it("ADMIN can remove Role from a Certifier", async () => {
			await mine.grantRole(CERTIFIER_ROLE, certifier.address);
			await mine.revokeRole(CERTIFIER_ROLE, certifier.address);
			expect(await mine.hasRole(CERTIFIER_ROLE, certifier.address)).to.equal(false);
		});

		it("non-ADMIN can't add Role from a Certifier", async () => {
			expect(mine.connect(certifier).grantRole(CERTIFIER_ROLE, sellerUser.address)).to.be.reverted;
		});

		it("non-ADMIN can't remove Role from an Certifier", async () => {
			await mine.grantRole(DEFAULT_ADMIN_ROLE, admin.address);
			expect(
			mine.connect(sellerUser).revokeRole(DEFAULT_ADMIN_ROLE, admin.address)
			).to.be.reverted;
		});
	});

	describe("Banning", () => {
		it("Admin can ban an address", async () => {
			await mine.grantRole(DEFAULT_ADMIN_ROLE, admin.address);
			await mine.connect(admin).banUser(certifier.address);
			expect(await mine.bannedUsers(certifier.address)).to.be.equal(true);
		});

		it("Admin can unban an address", async () => {
			await mine.grantRole(DEFAULT_ADMIN_ROLE, admin.address);
			await mine.connect(admin).banUser(certifier.address);
			await mine.connect(admin).unbanUser(certifier.address);
			expect(await mine.bannedUsers(certifier.address)).to.be.equal(false);
		});

		it("non-Admin can't ban an address", async () => {
			await expect(mine.connect(certifier).banUser(sellerUser.address)).to.be.reverted;
		});

		it("non-Admin can't unban an address", async () => {
			await mine.grantRole(DEFAULT_ADMIN_ROLE, admin.address);
			await mine.connect(admin).banUser(certifier.address);
			await expect(mine.connect(buyerUser).unbanUser(certifier.address)).to.be.reverted;
		});
	});

	describe("Mine version", () => {
		it("Returns Mine version", async () => {
			const version = await mine.connect(admin).getContractVersion();
			expect(version).to.equal("0.0.1");
		});
	});

	describe("Register user", () => {
		it("Register a new user(seller/buyer)", async () => {
			const userMetadataUrl = "url_metadata";
			const newUserRegistered = await registerUser();
			expect(newUserRegistered).to.equal(userMetadataUrl);
		});
	});

	describe("Certify", () => {
		it("Certify NFT", async () => {
			await registerUser();
			await registerCertifier();
			const events = await safeMint();
			const tokenId = events.events[1].args[0];
			await mine.connect(certifier).certify(tokenId, "new_metadata");
			const result = await mine.connect(certifier).productsVerified(tokenId);
			expect(result).to.equal(true);
		});
	});
});
