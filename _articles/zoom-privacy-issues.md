---
layout: "article"
title: "Zoom Violates Student Privacy"
author: [Nick Griffin, Luke Taylor]
image: zoom-unsecure.jpg
category: "Opinion"
date: 2020-04-05
---
As students relax after another week of distance learning, allegations have arisen that Zoom was selling the private information of every single user across the country. For the past few weeks, Classical students have been using a digital service that has been caught covertly recording and selling personal data to Facebook. According to a lawsuit[^1] filed against Zoom on March 30th, data was sent to Facebook every time a user joined a meeting. This data mainly consisted of data about the device used to make the call, including the device's model and advertising identifier.

After discovering these allegations, the Chronicle reached out to students to see how they were reacting to this news. Across the board, students were surprised by the idea that they were being forced to use a service that is actively spying on them.

"I'm kind of shocked," says senior Will Jones, going on to say that, "it would have been nice if the school gave us a heads up."

Jones is not the only person concerned about privacy. After finding out about the allegations against Zoom, the Chronicle conducted an Instagram poll of Classical students. In total, 83% of students did not trust Zoom to keep their personal data private.

According to investigative reports done by the Intercept[^2] and Washington Post[^3], despite advertising end-to-end encryption, which would prevent snooping from unwanted intruders, Zoom's implementation of this is inadequate at best. In fact, their method of end-to-end encryption opens more security holes than it solves. To start, Zoom makes use of what are called "encryption keys" to secure their video calls. Typically, this is a good idea, but in this case, these keys are created on Zoom's servers instead of the user's device. This means that Zoom can be compelled to surrender them to governments, if requested. This is made worse by the fact that Zoom currently generates some of these keys on servers in China, even when the connections are based in the United States. According to Chinese law[^4], companies are legally required to share encryption keys with the government, opening up every single Zoom call to be observed and recorded.

Even the encryption Zoom has is inadequate. Despite claiming to use 256-bit AES encryption — the industry standard — they instead use the weaker, though not entirely unsecure, 128-bit encryption[^5]. Where matters really take a turn for the worse is their use of the Electronic Codebook algorithm, or ECB. ECB is widely considered one of the worst ways to encrypt data using AES. This is because, while most methods to encrypt data end up scrambling it until it resembles static, ECB leaves behind some of the patterns found in the data, which can help reveal its contents. Below is an illustration, taken from the Intercept's report to offer an illustration of how ECB works in comparison to other methods.

<img src="/assets/images/penguin_illustration.jpg" />
<span>ECB leaves behind patterns in the data it encrypts that can reveal its contents. <a href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_Codebook_(ECB)">Wikipedia</a></span>

As this image shows, the original image is still visible even when encrypted with ECB. ECB is not secure enough to protect users' data from bad actors looking to spy on Zoom calls.

Providence Schools' distance learning policies are only exacerbating the problem. Many teachers require students to have their cameras on, going so far as to mark students absent for not having the camera on. According to multiple student sources, teachers have even gotten angry at students for not keeping themselves on camera during class. By requiring students to keep themselves on camera, teachers are allowing their students to potentially be spied on by governments or malicious intruders.

In addition to these privacy concerns, Zoom calls are widely open to "Zoom Bombers" eager to cause chaos. Since anyone can join most Zoom calls, people have "bombed" virtual meetings, connecting to meetings that have their access codes online and causing disruptions. There have been instances of inappropriate images and unwelcome voices appearing on Zoom classes at Classical and in meetings across the world. These incidents exemplify Zoom's weaknesses and demonstrate that it has serious security flaws that cannot be overlooked.

From hackers to Facebook to the Chinese government, Zoom has made it clear that anything on their service is not secure. If Providence Schools wants to protect the privacy of their students, they must work to hold Zoom accountable. We would not be the only school district to do this. New York City has actually taken the lead with this national crisis and recently banned Zoom from all of its public schools, instead opting for the more secure Microsoft Teams service. This is a major step forward for the fight for student privacy.

The Department of Education and Providence Schools are still working to make distance learning work for students and teachers. These allegations are new, and switching virtual platforms can be difficult even under less stressful circumstances. Zoom has an understandable appeal. It is free for most users, has relatively good video quality, and has convenient features like screen sharing and a chat feature. But these features should not be a reason to ignore the privacy violations the company has been and is still practicing. This has been a tough time for everyone, students and faculty alike, and the Chronicle recognizes this. However, now that the extent of malpractice at Zoom is known, schools need to act quickly to ensure that the privacy of their students and faculty are protected.


[^1]: https://www.scribd.com/document/454166545/Zoom-Lawsuit
[^2]: https://theintercept.com/2020/04/03/zooms-encryption-is-not-suited-for-secrets-and-has-surprising-links-to-china-researchers-discover/
[^3]: https://www.washingtonpost.com/technology/2020/04/03/thousands-zoom-video-calls-left-exposed-open-web/
[^4]: https://www.newamerica.org/cybersecurity-initiative/digichina/blog/translation-cybersecurity-law-peoples-republic-china/
[^5]: https://citizenlab.ca/2020/04/move-fast-roll-your-own-crypto-a-quick-look-at-the-confidentiality-of-zoom-meetings/
