---
description: Configure Amazon EFS so multiple Linux EC2 instances can
  share the same file system.
pubDate: 2021-06-09
title: How to Set Up Amazon EFS for Multiple EC2 Linux Instances
updatedDate: 2026-08-04
tags:
  - technology
  - aws
  - linux
  - devops
---

> Originally written in 2021. Updated in 2026 with current AWS
> recommendations.

If you have multiple Linux EC2 instances that need access to the same
files, Amazon Elastic File System (EFS) is one of the simplest managed
solutions.

In this walkthrough, we'll:

-   Create an Amazon EFS file system
-   Launch one or more Linux EC2 instances
-   Configure the required security groups
-   Mount the EFS file system on multiple EC2 instances
-   Configure the mount to persist after reboot

## Architecture

``` text
             Amazon EFS
                  │
      ┌───────────┴───────────┐
      │                       │
   EC2 Instance A        EC2 Instance B
      │                       │
      └──── Shared Files ─────┘
```

## Step 1 -- Create an Amazon EFS File System

1.  Open the AWS Console.
2.  Navigate to **Amazon EFS**.
3.  Create a new file system.
4.  Give it a meaningful name or tag.
5.  Select the VPC that your EC2 instances will use.
6.  Finish creating the file system.

## Step 2 -- Create Your EC2 Instances

Launch one or more Linux EC2 instances.

Ensure they:

-   Are in the same VPC as the EFS file system
-   Can communicate with the EFS mount targets

## Step 3 -- Configure Security Groups

Create:

-   An EC2 security group
-   An EFS security group

Allow inbound **NFS (TCP 2049)** traffic to the EFS security group from
the EC2 security group.

## Step 4 -- Install the EFS Client

Amazon Linux:

``` bash
sudo yum install amazon-efs-utils
```

Ubuntu:

``` bash
sudo apt update
sudo apt install amazon-efs-utils
```

> If `amazon-efs-utils` isn't available for your distribution, install
> the appropriate package from AWS or your package repositories.

## Step 5 -- Create a Mount Point

``` bash
sudo mkdir /backup
```

If desired:

``` bash
sudo chmod 777 /backup
```

## Step 6 -- Mount the File System

Using the EFS DNS name (recommended):

``` bash
sudo mount -t efs fs-12345678:/ /backup
```

You can find the exact mount command by selecting **Attach** from the
EFS console.

> **Note:** My original 2021 article used the EFS mount target IP
> address with a direct NFS mount. AWS now generally recommends using
> the EFS mount helper and DNS name because it supports TLS and
> simplifies mounting.

## Step 7 -- Mount Automatically After Reboot

Edit:

``` bash
sudo nano /etc/fstab
```

Add:

``` text
fs-12345678:/ /backup efs defaults,_netdev 0 0
```

Then test:

``` bash
sudo mount -a
```

## Step 8 -- Repeat on Additional EC2 Instances

Repeat the installation and mount steps on each EC2 instance that should
share the file system.

## Common Uses

Amazon EFS works well for:

-   Shared application assets
-   User uploads
-   Backups
-   Shared configuration
-   Container workloads
-   Content management systems

## What I Learned

When I first wrote these notes in 2021, I was learning AWS and wanted a
simple way for multiple Linux servers to share files.

Revisiting this article reminded me how much AWS has improved over the
years. The EFS mount helper makes the process cleaner, more secure, and
easier to maintain than mounting directly by IP.

One of the reasons I created this site is so I can revisit older work
like this, update it with what I've learned, and hopefully make it more
useful for the next person.
