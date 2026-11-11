---
description: My first YubiKey setup with Google and Bitwarden, the passkey mistake
  that confused me, and how I tested the key on my MacBook and Pixel.
pubDate: 2026-12-09
title: "Setting Up My First YubiKey: What Confused Me and What Finally Clicked"
updatedDate: 2026-12-09
tags:
  - technology
  - security
  - yubikey
  - bitwarden
  - passkeys
---

I bought my first YubiKey today, and I had a lot of questions. Do I need an app? Does it replace my password? Should I remove SMS verification? Do I need to eject it before unplugging it?

I wanted to understand what I was setting up rather than click through prompts and assume I was protected. That turned out to matter: my first Bitwarden setup wasn't what I thought it was.

## What I bought

I picked up a **YubiKey 5C NFC** at Best Buy for **$58 before tax**. It connects through USB-C or NFC, which suits my MacBook and Pixel.

I had also considered the **Security Key C NFC**, listed at $29 when I was shopping. The store I visited didn't have it, so I bought the 5C NFC and planned to order a cheaper backup separately. 

The distinction I needed was this:

| Capability | Security Key C NFC | YubiKey 5C NFC |
| --- | --- | --- |
| USB-C and NFC | Yes | Yes |
| FIDO2 passkeys and security-key 2FA | Yes | Yes |
| The Google and Bitwarden security-key setup I used | Yes | Yes |
| Store authenticator-code secrets on the key | No | Yes |
| Smart-card/PIV and OpenPGP features | No | Yes |

Both support the authentication methods I needed for my initial account setup. The extra features on the 5C NFC are useful for other workflows, including smart-card login and digital signatures. 

The current USB-C models also look very similar: a small black body, a gold touch contact, and a keyring hole. Check the model name instead of relying on appearance. Yubico's [identification guide](https://www.yubico.com/products/identifying-your-yubikey/) lists the models and their functions.

## Three things I kept mixing up

The words “passkey,” “security key,” and “authenticator” kept appearing in related settings, but they weren't interchangeable.

| Term | What I needed to understand |
| --- | --- |
| **Physical security key** | The YubiKey itself. Depending on the service, it can be used for a second step after a password or hold a passkey for login. |
| **Passkey** | A credential that might live on a physical key, a device, or in a supporting password manager. Seeing “passkey” doesn't tell me where it was saved. |
| **Authenticator code** | Usually a rotating six-digit code. An app generates it from a shared secret. My 5C NFC can store those secrets for use with Yubico Authenticator, but that is separate from registering it directly with a website. |

Touching the gold contact on my key is also **not fingerprint recognition**. It confirms a physical interaction with the key. My MacBook's Touch ID is a different authenticator.

## I started with Google and Bitwarden

I added the key to my two main Google accounts and then worked on Bitwarden. Email and my password manager felt like sensible places to start because so many other accounts depend on them.

Bitwarden initially looked as though it required an upgrade. The confusing part was the separate **YubiKey OTP** option, which requires Premium. **FIDO2 WebAuthn, labeled Passkey in the two-step login settings, is available on the free plan.** Bitwarden documents the distinction in its [two-step login methods](https://bitwarden.com/help/setup-two-step-login/) guide.

## My Bitwarden mistake: I registered Touch ID instead of the YubiKey

During setup on my MacBook, I used Touch ID to create the passkey and named the entry “yubikey.” I thought I was setting up the physical YubiKey, but I had actually registered my MacBook’s Touch ID. The settings showed the provider as turned on, with an entry named “yubikey,” so I assumed I was done.

Then I opened an incognito window, entered my email and master password, and tried the physical key. I got an error saying it wasn't registered.

What I had missed was **“More options”** in the setup prompt. That was where I needed to go to select **“USB security key”** instead of using MacBook Touch ID. Calling the Touch ID credential “yubikey” had only changed its label; it hadn’t made it a credential on the physical key.

I went back, opened **More options**, selected **USB security key**, touched the YubiKey’s gold contact when prompted, and saved the result. I ended up with separate MacBook Touch ID and YubiKey credentials configured for login and two-step verification.

The lesson for me: **name the entry clearly, select the intended authenticator, and test it.**

For the two-step setup, Bitwarden's current path is **Settings → Security → Two-step login → Passkey → Manage**. Add a name, select **Read Key**, open **More options → USB security key** if the prompt offers Touch ID as it did on my MacBook, and finish with **Save**. See its [setup instructions](https://bitwarden.com/help/setup-two-step-login-fido/) for the current interface.

## Testing was the step that caught the problem

I kept my working Bitwarden session open while testing in an incognito window. That gave me a way back into settings while I worked through the error.

I tested the password-and-second-factor flow: email, master password, then the YubiKey. Once that worked on my MacBook, I tested it on my Pixel through USB-C, and that worked too.

I didn't need to register the key again just because I changed devices. The registration belonged to my Bitwarden account.

Bitwarden also has a separate [passkey login feature](https://bitwarden.com/help/login-with-passkeys/). Registering a key for two-step verification doesn't automatically configure that login method. Whether a passkey can also decrypt the vault depends on the supported setup, so I still need to retain my master password.

## Recovery is part of the setup

I printed the backup codes for my Google accounts and my Bitwarden two-step login recovery code. Each needs a clear account label and secure storage outside the accounts it helps recover.

Google's backup codes are single-use. Generating a new set invalidates the previous set, so an old printout needs replacing. Google explains this in its [backup-code guide](https://support.google.com/accounts/answer/1187538).

Bitwarden's recovery code lets me disable two-step login if I lose access to my second factor. **It does not recover a forgotten master password.** Its [recovery-code documentation](https://bitwarden.com/help/two-step-recovery-code/) explains that process.

My planned backup key is another part of this. It must be registered separately with each account; it doesn't automatically inherit the first key's registrations. The cheaper Security Key C NFC can back up my FIDO-based Google and Bitwarden access, but it can't back up the 5C NFC's extra authenticator-code or smart-card functions.

## A few smaller questions I had

**Do I need Yubico Authenticator?** Not for the direct Google and Bitwarden security-key registrations I completed. The app is useful for managing supported key features and for generating codes from secrets stored on the key. An invitation to scan a QR code is not an instruction to register all my existing security-key accounts again.

**Do I eject the key?** No. Once the authentication or setup operation has finished, I can unplug it.

**Should I leave it plugged in?** I plan to unplug mine and keep it portable between my devices. Keeping it separate from my laptop also means they aren't necessarily lost together.

**Can I use it to unlock my MacBook?** Yes. My YubiKey 5C NFC supports macOS login through a separate smart-card/PIV setup, using the key and a PIN. Registering it with Google or Bitwarden doesn't enable this automatically. The cheaper Security Key C NFC doesn't support PIV, so it wouldn't work as a backup for this setup. For now, I'm keeping Touch ID and my MacBook login password. Yubico's [macOS smart-card guide](https://developers.yubico.com/PIV/Guides/Smart_card-only_authentication_on_macOS.html) explains the configuration options.

**Can I remove SMS verification?** That's something to review account by account after testing reliable alternatives and recovery options. I plan to register my backup key first. If a service only supports SMS, I won't turn off its only available second factor. A phone number used for account recovery or alerts may also be separate from SMS sign-in verification.

## What I'm doing next

My next steps are to finish testing my Google registrations, order and register the backup key, and review my remaining Google and financial accounts for supported security options.

I'm also choosing Bitwarden as my main password manager across my MacBook and Pixel. For sites that require rotating codes, a standalone authenticator app remains an option. I don't need to migrate everything in one sitting.

I feel more secure already, but I also understand the limits better. A security key doesn't protect an already unlocked laptop or an existing signed-in session, and recovery methods still matter.

The most useful thing I did today was open that incognito window. The settings looked right; the test showed me they weren't. Asking the basic questions helped me get to a setup I could actually verify.
