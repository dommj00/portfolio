# MFP Service Account Hardening

**Conditional Access & Compensating Controls**
**The Bookshop Company (TBC)**
**M365 Security — Conditional Access Series**
**Microsoft Entra ID / Microsoft 365 E5 Dev Tenant**

**Completed By:** Manita Crawley
**Assessment Date:** April 2026

This portfolio exercise was conducted in a controlled M365 E5 developer tenant created specifically for educational and portfolio demonstration purposes. All findings and configurations are based on this test environment to showcase practical skills.

---

## Scenario

The Bookshop Company (TBC) operates 20 multifunction printers (MFPs) across 10 site locations. These printers provide scan-to-email functionality for all employees to scan documents and send them to receipients on the GAL.

To enable this, a single shared service account, bksp-mfp@mjsecuritylab.com, is authenticated on each MFP using SMTP credentials (email address, password, and SMTP port configuration). Once signed in, employees can select recipients from the Microsoft Global Address List (GAL) and sent scan documents directly to the selected emails.

The problem: The MFP SMTP authentication flow does not support multi-factor authentication. This means this service account with single factor authentication is exposed across 20 network devices at 10 physical locations with no other protection.

## Environment Details

| Item | Detail |
|---|---|
| Tenant | mjsecuritylab.com (M365 E5 Dev) |
| Service Account | bksp-mfp@mjsecuritylab.com |
| MFP Count | 20 printers across 10 sites |
| Authentication Method | SMTP AUTH (Basic Authentication) |
| MFA Support | Not supported by MFP hardware |
| License Requirement | Entra ID P1 or P2 (for Conditional Access and Identity Protection) |

## Objective

Harden the bksp-mfp@mjsecuritylab.com service account to the maximum extent possible without breaking scan-to-email functionality. Since MFA is not an option, the design should use compensating controls comprised of Conditional Access policies, account permission restrictions, monitoring, and a defensible password policy.

---

## Account Hardening

### Password Creation and Handling

A randomly generated 18-character password consisting of a mix of uppercase and lowercase letters, with numbers and symbols was created and stored in the company's IT Glue application where it is encrypted. This application grants access to authorized employees via Single-Sign On.

### Disable Self-Service Password Reset (SSPR)

Oftentimes, after compromising an account, an attacker starts by changing the account's password. This is done in an attempt to lock out admins, thus slowing down the incident response process enough to execute malicious actions. Disabling SSPR on the bksp-mfp@mjsecuritylab.com account takes this into consideration.

A password can only be reset via Entra ID and Microsoft Admin Center by admins with the User Administrator, Password Administrator, Helpdesk Administrator, and Global Administrator roles.

Removing the ability to reset password via SSPR vastly limits the chances of incident response staff getting locked out of the account and instead facilitates faster response actions.

### Entra ID Roles

Given that the singular role of the bksp-mfp@mjsecuritylab.com account is to send mail, and receive in rare cases, there were no Entra ID roles assigned. To assign such a role would go beyond the scope of account's objectives and increase the blast radius in the event of a successful compromise.

### Mail Flow Rule

After compromising an account, attackers usually create mailbox rules, or use the account to send phishing email. We will limit the scope of who can be contacted by imposing a restriction whereby mail can only be sent to and received from intra-organizational users.

External ingress and egress mail is blocked to and from this account since mail should only be sent, and received in some instances, by employees. This also provides a way to enforce Data Loss Prevention on the account, making it a less effective target for attackers if compromised.

### Microsoft Apps Minimization

When creating the account, great consideration was given to making it a shared mailbox, however, shared mailbox accounts do not allow SMTP authentication or any sign ins using email and password, for that matter. Given these restraints, the only solution was to assign the account a license with the minimum necessary apps and services needed for its role.

In the test environment, the only assignable license is the Microsoft 365 Developer license and it includes a multitude of additional Microsoft apps and services. In order to further enforce the principle of least privilege here, all but the following apps were removed:

- **Exchange Online (Plan 2)** – kept for mailbox access
- **Microsoft Defender for Office 365** – kept for the enforcement of mail security
- **Microsoft Entra ID P1** – kept in order to apply Conditional Access policies that govern the account

### Block Unneeded Mail Authentication Methods

Microsoft equips all licensed mail accounts with access to multiple email apps such as Outlook on the Web, IMAP, POP, etc. In an effort to continue reducing permissions, access, and account scope, all unneeded email apps were identified and removed. The email account was left with only Authenticated SMTP.

These changes limit the avenues that can be used by a malicious person to compromise the account.

### Conditional Access Policies

To further harden the account and block malicious sign in attempts, three Conditional Access policies were created.

- **Country-Based** – this policy restricts sign ins to only IP addresses originating from the United States
- **IP-Based** – this policy restricts sign in attempts to only acceptable locations based on a range or select group of IP addresses assigned to the printers at each site.
- **Disable Legacy Authentication Protocols** – this policy may seem duplicative because it disables the same protocols used in mail apps. This was the intended effect. In security, configurations may be accidentally changed creating unwanted outcomes. The objective of having both is so that an accidental change one area doesn't allow unacceptable sign ins to slip through the cracks.

### Defense in Depth

This entire document dedicated to hardening the account exemplifies defense in depth. It is further enforced if you look at the Country-Based and IP-Based conditional access policies. They once again appear to be repetitive but what they do is provide a layered approach to securing the account.

At level one, we have the Country-Based Restriction Policy which allows only access to IP addresses originating from the United States. Then the level two policy, IP-based restriction, will deny access to all IP addresses except for the ones explicitly stated in the 'MFP-Printer-MD' named location.

The Country-Based policy will be the first line of defense and the IP-Based policy in conjunction with the Legacy Protocols policy will clean up and filter on a more granular level so that only those who are truly authorized for access will have it.

### Monitoring

Logging and alerting on changes to the CA policies.

---

## Things I Would Do Differently in a Production Environment

1. I would test that the restrictions imposed do not impact production printers to prevent down times by testing on one printer initially, then putting the policy in report-only mode for a week before activating it to identify challenges and potential edge cases.

2. Set up alerting for failed sign in attempts that are in excess of three consecutive unsuccessful attempts. I would also set up alerts for sign in attempts that are blocked by the 'BKSP-MFP Country-Based Restriction Policy', 'BKSP-MFP IP-Based Restriction Policy', and 'BKSP-MFP Disable Legacy Authentication Protocols' conditional access policies. This would allow timely response in the event of a compromise.

3. Assign Microsoft 365 E1 License and minimize apps and services. My developer environment limits me to one overly permissive license which would likely be considered excessive in a production environment given the objectives of this account.
