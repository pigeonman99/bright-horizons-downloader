const axios = require('axios'),
  moment = require('moment'),
  piexif = require('piexifjs'),
  FileType = require('file-type'),
  sharp = require('sharp'),
  fs = require('fs');

(async () => {
  const startDate = moment(process.argv[2]);
  const endDate = moment(startDate).endOf(process.argv[3]);
  const cookie = process.argv[4];
  let res = await axios.get(`https://mybrightday.brighthorizons.com/remote/v1/events?direction=range&earliest_event_time=${startDate.unix()}&latest_event_time=${endDate.unix()}&num_events=300&client=dashboard`, {headers: {'cookie': cookie}});
  const events = res.data.events;
  const activities = events.filter(e => e.type === 'Activity').sort((a, b) => a.event_time - b.event_time);
  console.log(`${activities.length} media records found.`);
  let count = 0;
  for (const activity of activities) {
    const fileName = moment(activity.event_time, 'X').format('YYYY-MM-DD');
    for (const attachment of activity.new_attachments) {
      let media = await axios.get(`https://mybrightday.brighthorizons.com/remote/v1/obj_attachment?obj=${activity.key}&key=${attachment.key}`, {
        responseType: 'arraybuffer',
        headers: {'cookie': cookie}
      });
      let data = media.data;
      let dataType = await FileType.fromBuffer(data);
      if (dataType.mime === 'image/png') {
        data = await sharp(data).jpeg({quality: 100}).toBuffer();
        dataType = await FileType.fromBuffer(data);
      }
      if (dataType.mime === 'image/jpeg') {
        data = modifyExif(data.toString('binary'), activity);
      }
      const fn = writeFile(fileName, dataType.ext, data);
      console.log(`${++count}: ${fn} saved successfully.`);
    }
  }
})();

function modifyExif(data, activity) {
  let eventTime = moment(activity.event_time, 'X');
  const exifDateTime = eventTime.format('YYYY:MM:DD HH:mm:ss');
  const exifObj = piexif.load(data);
  exifObj.Exif[piexif.ExifIFD.DateTimeOriginal] = exifObj.Exif[piexif.ExifIFD.DateTimeDigitized] = exifObj['0th'][piexif.ImageIFD.DateTime] = exifDateTime;
  if (activity.comment) {
    exifObj['0th'][piexif.ImageIFD.ImageDescription] = activity.comment.trim();
  }
  const exifBytes = piexif.dump(exifObj);
  const newBinary = piexif.insert(exifBytes, data);
  return Buffer.from(newBinary, 'binary');
}

function writeFile(fileName, ext, data) {
  let count = 1;
  while (true) {
    try {
      let fn = `${fileName} ${count < 10 ? 0 : ''}${count}.${ext}`;
      fs.writeFileSync(fn, data, {flag: 'wx'});
      return fn;
    } catch (err) {
      count++;
    }
  }
}