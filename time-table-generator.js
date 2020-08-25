
'use-strict';

function createSegmentTable() {
  const segmentTable = {
    Monday: {
      '09:00-09:55': '',
      '10:00-10:55': '',
      '11:00-11:55': '',
      '12:00-12:55': '',
      '14:30-15:55': '',
      '16:00-17:25': '',
      '18:00-19:25': '',
      '19:30-21:00': '',
    },
    Tuesday: {
      '09:00-09:55': '',
      '10:00-10:55': '',
      '11:00-11:55': '',
      '12:00-12:55': '',
      '14:30-15:55': '',
      '16:00-17:25': '',
      '18:00-19:25': '',
      '19:30-21:00': '',
    },
    Wednesday: {
      '09:00-09:55': '',
      '10:00-10:55': '',
      '11:00-11:55': '',
      '12:00-12:55': '',
      '14:30-15:55': '',
      '16:00-17:25': '',
      '18:00-19:25': '',
      '19:30-21:00': '',
    },
    Thursday: {
      '09:00-09:55': '',
      '10:00-10:55': '',
      '11:00-11:55': '',
      '12:00-12:55': '',
      '14:30-15:55': '',
      '16:00-17:25': '',
      '18:00-19:25': '',
      '19:30-21:00': '',
    },
    Friday: {
      '09:00-09:55': '',
      '10:00-10:55': '',
      '11:00-11:55': '',
      '12:00-12:55': '',
      '14:30-15:55': '',
      '16:00-17:25': '',
      '18:00-19:25': '',
      '19:30-21:00': '',
    },
  };
  return segmentTable;
}

let oneTwoSegmentTable = createSegmentTable();
let threeFourSegmentTable = createSegmentTable();
let fiveSixSegmentTable = createSegmentTable();
const errorMessages = [];

function addClass(timeTable, day, classTime, cellText) {
  for (let i = 0; i < classTime.length; ++i) {
    const time = classTime[i];
    timeTable[day][time] = cellText;
  }
  return timeTable;
}

function addToTable(courseId, courseTitle, segment, timing) {
  const cellText = `${courseId}(${courseTitle})`;
  const pieces = timing.split('-');
  const day = pieces[0];
  const start = pieces[1];
  const end = pieces[2];
  const startTime = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '14:30',
    '16:00',
    '18:00',
    '19:30',
  ];
  const endTime = [
    '09:55',
    '10:55',
    '11:55',
    '12:55',
    '15:55',
    '17:25',
    '19:25',
    '21:00',
  ];
  const classesTime = [];
  for (let i = 0; i < startTime.length; ++i) if (startTime[i] === start) classesTime.push(`${startTime[i]}-${endTime[i]}`);
  for (let i = 0; i < endTime.length; ++i) if (endTime[i] === end) classesTime.push(`${startTime[i]}-${endTime[i]}`);

  switch (segment) {
    case '1-2':
      oneTwoSegmentTable = addClass(
        oneTwoSegmentTable,
        day,
        classesTime,
        cellText,
      );
      break;
    case '3-4':
      threeFourSegmentTable = addClass(
        threeFourSegmentTable,
        day,
        classesTime,
        cellText,
      );
      break;
    case '5-6':
      fiveSixSegmentTable = addClass(
        fiveSixSegmentTable,
        day,
        classesTime,
        cellText,
      );
      break;
    case '1-4':
      oneTwoSegmentTable = addClass(
        oneTwoSegmentTable,
        day,
        classesTime,
        cellText,
      );
      threeFourSegmentTable = addClass(
        threeFourSegmentTable,
        day,
        classesTime,
        cellText,
      );
      break;
    case '3-6':
      threeFourSegmentTable = addClass(
        threeFourSegmentTable,
        day,
        classesTime,
        cellText,
      );
      fiveSixSegmentTable = addClass(
        fiveSixSegmentTable,
        day,
        classesTime,
        cellText,
      );
      break;
    case '1-6':
      oneTwoSegmentTable = addClass(
        oneTwoSegmentTable,
        day,
        classesTime,
        cellText,
      );
      threeFourSegmentTable = addClass(
        threeFourSegmentTable,
        day,
        classesTime,
        cellText,
      );
      fiveSixSegmentTable = addClass(
        fiveSixSegmentTable,
        day,
        classesTime,
        cellText,
      );
      break;
  }
}

function process(className) {
  const courses = $(className);
  for (let i = 0; i < courses.length; ++i) {
    const course = courses[i];
    if (course === undefined) continue;
    if (course.children.length < 9) continue;
    const { children } = course;
    const courseID = children[7].children[0].children[0].title;
    const courseTitle = children[8].children[0].title;
    const timeTableButton = children[7].children[3];
    timeTableButton.click();
    const timeTableID = course.children[7].children[3].id.replace(
      'timeTab',
      'timeTabTr',
    );
    const timeTable = $(`.${timeTableID}`);
    for (let j = 0; j < timeTable.length; ++j) {
      const lecture = timeTable[j];
      if (lecture.children.length < 3) {
        errorMessages.push(
          `No time table available for ${courseID}(${courseTitle})`,
        );
        continue;
      }
      const segment = lecture.children[1].textContent;
      const timing = lecture.children[2].children[1].textContent;
      addToTable(courseID, courseTitle, segment, timing);
    }
    timeTableButton.click();
  }
}

function generateTable(timeTable) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timings = [
    '09:00-09:55',
    '10:00-10:55',
    '11:00-11:55',
    '12:00-12:55',
    '14:30-15:55',
    '16:00-17:25',
    '18:00-19:25',
    '19:30-21:00',
  ];
  let htmlText = "<table style='font-size: 15px;'>"
    + '<tr>'
    + "<td style='background-color: #E2E3E5'>"
    + ''
    + '</td>';
  for (let i = 0; i < timings.length; ++i) htmlText = `${htmlText}<td style='background-color: #E2E3E5'>${timings[i]}</td>`;
  htmlText = `${htmlText}</tr>`;

  for (let i = 0; i < days.length; ++i) {
    const day = days[i];
    schedule = timeTable[day];
    htmlText = `${htmlText}<tr>`;
    htmlText = `${htmlText}<td style='background-color: #E2E3E5'>${day}</td>`;
    for (let j = 0; j < timings.length; ++j) {
      const timing = timings[j];
      htmlText = `${htmlText}<td>${schedule[timing]}</td>`;
    }
    htmlText = `${htmlText}</tr>`;
  }
  htmlText = `${htmlText}</table>` + '<br> <br>';
  return htmlText;
}

function parseTable() {
  const div = document.createElement('div');
  div.id = 'printTimeTableDiv';
  div.style = 'font-size: 20px;'
    + 'text-align: left;'
    + 'background-color: white;'
    + 'padding: 10px';
  let innerHtmlText = `Report generated on ${new Date()}<br>`;
  innerHtmlText = `${innerHtmlText}If you find any discrepancy please write to <strong><em>cs18btech11052@iith.ac.in</em></strong><br>`;
  innerHtmlText = `${innerHtmlText}Press Ctrl + P to download in pdf format<br><br>`;
  if (errorMessages.length > 0) {
    innerHtmlText = `${innerHtmlText}Following problems were detected:<br>`;
    innerHtmlText = `${innerHtmlText}<span style='color: red'>${errorMessages.join(
      '<br>',
    )}</span><br><br>`;
  }
  innerHtmlText = `${innerHtmlText}<span>Time table for segment 1-2</span><br>`;
  innerHtmlText += generateTable(oneTwoSegmentTable);
  innerHtmlText = `${innerHtmlText}<span>Time table for segment 3-4</span><br>`;
  innerHtmlText += generateTable(threeFourSegmentTable);
  innerHtmlText = `${innerHtmlText}<span>Time table for segment 5-6</span><br>`;
  innerHtmlText += generateTable(fiveSixSegmentTable);
  div.innerHTML = innerHtmlText;
  const newWindow = window.open();
  const documentText = `${
    '<!DOCTYPE html>'
      + '<html>'
      + '<head>'
      + "<link rel='icon' href='https://pbs.twimg.com/profile_images/833355550167412736/vmQsHdIj_400x400.jpg' type='image/gif' sizes='16x16'>"
      + '<style>'
      + 'table, th, td {'
      + 'border: 1px solid black;'
      + 'border-collapse: collapse;'
      + '}'
      + 'td {'
      + 'padding: 5px;'
      + '}'
      + '</style>'
      + '<title>AIMS - Generated Time Table</title>'
      + '</head>'
      + '<body>'
  }${div.innerHTML}</body>` + '</html>';
  newWindow.document.write(documentText);
}

(function main() {
  const programs = $('.card-body');
  for (let i = 1; i < programs.length; ++i) {
    const program = programs[i];
    const regId = program.children[0].getAttribute('data-deg-dtl');
    process(`.stdtDegReg_${regId}_1`);
    process(`.stdtDegReg_${regId}_2`);
    process(`.stdtDegReg_${regId}_3`);
  }
  parseTable();
}());
