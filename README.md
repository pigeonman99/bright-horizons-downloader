# Bright Horizons Downloader
This script allows you to connect to Bright Horizons' API and retrieve photos and videos for your kids.

# Usage
`% node bright-horizons-downloader.js [Date] [End of Period] [Magic Cookie]`

For example, the following will download all of your kids' photos and videos for the month of May, 2021:

`% node bright-horizons-downloader.js 2021-05-01 month DgU00=XMGE1bkO6T...ncx2B1hnEULg==`

This example below will download all of your kids' photos and videos for the week of June 6th, 2021:

`% node bright-horizons-downloader.js 2021-06-06 week DgU00=XMGE1bkO6T...ncx2B1hnEULg==`

# How to Obtain the "Magic Cookie"
1. Login to your account at: https://familyinfocenter.brighthorizons.com/
1. Launch "My Bright Day"
1. Open your browser's debugger and grab the cookie named "DgU00" for the domain "mybrightday.brighthorizons.com". That is the magic cookie to be used on the command line.
