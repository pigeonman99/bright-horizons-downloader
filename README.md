# Bright Horizons Downloader
This nodejs script allows you to connect to the Bright Horizons' API and retrieve photos and videos for your kids.

The script also performs the following:
1. If the pictures downloaded are of type PNG (which seems to be the case for all pictures downloaded at this time), convert them to JPEG.
2. Insert DateTimeOriginal and ImageDescription to the Jpeg's EXIF header, populated from Bright Horizons' API
3. Files are named as `YYYY-MM-DD NUM.(jpg|mp4)`.

# Usage
`% node bright-horizons-downloader.js [Date] [End of Period] [Magic Cookie]`

For example, the following will download all of your kids' photos and videos for the month of May, 2021:

`% node bright-horizons-downloader.js 2021-05-01 month DgU00=XMGE1bkO6T...ncx2B1hnEULg==`

This example below will download all of your kids' photos and videos for the week of June 6th, 2021:

`% node bright-horizons-downloader.js 2021-06-06 week DgU00=XMGE1bkO6T...ncx2B1hnEULg==`

# How to Obtain the "Magic Cookie"
1. Login to your account at: https://familyinfocenter.brighthorizons.com/
2. Launch "My Bright Day"
3. Open your browser's debugger and grab the cookie named "DgU00" for the domain "mybrightday.brighthorizons.com". This will be the magic cookie you use on the command.
