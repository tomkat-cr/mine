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

	beforeEach(async () => {
		Mine = await ethers.getContractFactory("Mine");
		[admin, certifier, sellerUser, buyerUser, ...addrs] = await ethers.getSigners();
		mine = await Mine.deploy();
		DEFAULT_ADMIN_ROLE = await mine.DEFAULT_ADMIN_ROLE();
		CERTIFIER_ROLE = await mine.CERTIFIER_ROLE();
		USER_ROLE = await mine.USER_ROLE();
	});

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
});
