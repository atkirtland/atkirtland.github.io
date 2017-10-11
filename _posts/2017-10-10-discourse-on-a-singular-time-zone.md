---
---

About a year ago, I considered the advantages and disadvantages of switching from our current system of over 24 time zones.

# History
Time was historically kept on sundials, which were not terribly accurate. As we moved into the 19th century and consistent mechanical clocks were built, towns began to keep their own local mean solar time. This time could differ by up to 15 minutes from surrounding regions. In 1675, Greenwich Mean Time was established with the contruction of the Royal Observatory. GMT was designed to aid sailors' determination of longitude and to provide a consistent reference frame for towns. Towns then moved into regions based on their railway connections.

These individualized times were kept up until 1847, when railway companies began to adopt GMT in Great Britain. Interestingly, this became known as railway time and some clocks from the period exhibit two minutes hands, one for railway time and one for local time. In 1868 New Zealand adopted a time 11 hours and 30 minutes ahead of GMT; this time was later called New Zealand Mean Time.

American time zones were not coordinated until 1883 on "The Day of Two Noons". Progress continued with colonization and imperialism, and by 1900 most countries had standard time zones. By 1929, nearly all were coordinated with GMT. A notable exception is Nepal, who became to last to settle to UTC+5:45 in 1986. GMT began to be called the more neutral Universal Coordinated Time, or UTC after the French equivalent's word order, in 1960.

# Generalizations
In essence, we moved from a completely independent conception of time to time based around localized authority, train stations or government. As more people became connected, the need to realize interconnected measurement became pertinent.
However, as we still needed a way to keep track of local time, we used a mix of
both; discrete differences called time zones.

Today, we face few of the problems those one or two centuries ago faced. We
can handle coordination across the globe of a consistent timing scheme. We no
longer face the fixed nature of mechanical clocks, but instead have easily
reprogrammable electronics. Indeed, between 1949 and 1950 China switched from a system
of five time zones to just one, the solar time of Beijing.

# Question
However, there are several issues with the approach one a singular time zone. First, how can one determine
the apparent time of day at a location? Though one may know their French aunt
has the same absolute time as themself, how does one know when their aunt dresses
for bed and feeds the dog? This could be satisfied with a chart of relative times,
say the time for rise and fall; however, this is equivalent to a list of differences
between regions, the purpose time zones were created. By themselves, continuous time differences
based on solar angle will also not work since organizations need a way to communicate
time.

The solution to this problem is some kind of solar angle calculation. Note that this idea
is likely not worth the effort, but it is a nice thought experiment. On one's
social media, they could have a small indicator showing the time of day, perhaps
a sundial-esque icon like this:

| ![Sundial Icon](/assets/img/nightday_teaser.jpg "Sundial") |
| :--: |
| *https://cdn.dribbble.com/users/4324/screenshots/283592/nightday_teaser.jpg* |

This indicator would show the approximate time of apparent day at the user's location. I imagine that computing could be grouped around users in similar locations. This would have interesting interplay with location services that continuously map a user's location. Thus, this could lead to security flaws (though is time zoning not already a very mild location-attack?). The little display would update as [absolute] time passes, and the display itself could be based off solar angle.

The calculations for solar angle and other relavent measures are already available
through tools like [NOAA's Solar Calculator](https://www.esrl.noaa.gov/gmd/grad/solcalc/ "NOAA Solar Calculator").
So if this was adopted, I image the time on one's phone or computer being the same across all devices,
while localized angle measures for apparent day are available upon request. Ultimately, I'm not sure this
would be worth it, but it could be a cool design project to create a display as described.
