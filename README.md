# Bright Horizons Downloader
This nodejs script helps you connect to Bright Horizons' API and download photos and videos for your kids.

The script also performs the following:
1. If the pictures downloaded are of type PNG (which seems to be the case for all pictures downloaded at this time), convert them to JPEG.
2. Insert DateTimeOriginal and ImageDescription to the Jpeg's EXIF header, populated from Bright Horizons' API
3. Files are named as `YYYY-MM-DD NUM.(jpg|mp4)`.

# Usage
1. Clone this repo.
2. Run `npm install` to install all dependencies required.
3. Run `% node bright-horizons-downloader.js [Date] [End of Period] [Session Cookie]` to download photos & videos for your kids. (see below on how to obtain the "Session Cookie")

For example, the following will download all of your kids' photos and videos for the month of May, 2021:

`% node bright-horizons-downloader.js 2021-05-01 month session=eyJ1c...RYQ`

This example below will download all of your kids' photos and videos for the week of June 6th, 2021:

`% node bright-horizons-downloader.js 2021-06-06 week session=eyJ1c...RYQ`

# How to Obtain the "Session Cookie"
1. Login to your account at [Bright Horizons](https://familyinfocenter.brighthorizons.com/)
2. Launch "My Bright Day"
3. Open your browser's debugger and grab the cookie named `session` for the domain `mybrightday.brighthorizons.com`. This will be the session cookie you use on the command.

# About This Script
After manually downloading photos from Bright Horizons' "My Bright Day" website for a few months, I got tired of the repetition and so decided to create a script to automate it.

I took reference from [brightday-dl](https://github.com/txchen/brightday-dl) when writing this script.

It is possible to enhance this script to programmatically obtain the "Session Cookie" via username/password, but I didn't have the time to figure this part out (it's pretty easy to grab it from browser's debugger anyway).
