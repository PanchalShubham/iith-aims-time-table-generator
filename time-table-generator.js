/* ******************************************************
 * Created on Mon Aug 24 2020							*
 * Author: Shubham Panchal (cs18btech11052@iith.ac.in)	*
 ********************************************************/

'use-strict'
var oneTwoSegmentTable = createSegmentTable()
var threeFourSegmentTable = createSegmentTable()
var fiveSixSegmentTable = createSegmentTable()
var errorMessages = []

function main(){
	var programs = $('.card-body')
	for (var i = 1; i < programs.length; ++i){
		var program = programs[i]
		var regId = program.children[0].getAttribute("data-deg-dtl")
		process(regId)
	}
	parseTable()
}
main()
	

function process(regId){
	var courses = $(`.stdtDegReg_${regId}_1`)
	for (var i = 0; i < courses.length; ++i){
		const course = courses[i]
		if (course === undefined)	continue
		if (course.children.length < 9)	continue
		const children = course.children
		const courseID = children[7].children[0].children[0].title
		const courseTitle = children[8].children[0].title
		const timeTableButton = children[7].children[3]
		timeTableButton.click()
		const timeTableID = course.children[7].children[3].id.replace("timeTab", "timeTabTr")
		const timeTable = $(`.${timeTableID}`)
		for (var j = 0; j < timeTable.length; ++j){
			const lecture = timeTable[j]
			if (lecture.children.length < 3){
				errorMessages.push(`No time table available for ${courseID}(${courseTitle})`)
				continue
			}
			const segment = lecture.children[1].textContent
			const timing = lecture.children[2].children[1].textContent
			addToTable(courseID, courseTitle, segment, timing)
		}
		timeTableButton.click()
	}
}



function addToTable(courseId, courseTitle, segment, timing){
	const cellText = `${courseId}(${courseTitle})`
	const pieces = timing.split('-')
	const day = pieces[0]
	const start = pieces[1]
	const end = pieces[2]
	const startTime = ['09:00','10:00','11:00','12:00',
						'14:30','16:00','18:00','19:30']	
	const endTime = ['09:55','10:55','11:55','12:55',
						'15:55','17:25','19:25','21:00']
	const classesTime = []
	for (var i = 0; i < startTime.length; ++i)
		if (startTime[i] === start)
			classesTime.push(startTime[i] + "-" + endTime[i])
	for (var i = 0; i < endTime.length; ++i)
		if (endTime[i] === end)
			classesTime.push(startTime[i] + "-" + endTime[i])

	switch (segment){
		case '1-2':
			oneTwoSegmentTable = 
					addClass(oneTwoSegmentTable, day, 
								classesTime, cellText); 
			break;
		case '3-4':
			threeFourSegmentTable = 
					addClass(threeFourSegmentTable, day, 
								classesTime, cellText); 
			break;
		case '5-6':
			fiveSixSegmentTable = 
					addClass(fiveSixSegmentTable, day, 
								classesTime, cellText); 
			break;
		case '1-4':
			oneTwoSegmentTable = 
					addClass(oneTwoSegmentTable, day, 
								classesTime, cellText); 
			threeFourSegmentTable = 
					addClass(threeFourSegmentTable, day, 
								classesTime, cellText); 
			break;
		case '3-6':
			threeFourSegmentTable = 
					addClass(threeFourSegmentTable, day, 
								classesTime, cellText); 
			fiveSixSegmentTable = 
					addClass(fiveSixSegmentTable, day, 
								classesTime, cellText); 
			break;
		case '1-6':
			oneTwoSegmentTable = 
					addClass(oneTwoSegmentTable, day, 
								classesTime, cellText); 
			threeFourSegmentTable = 
					addClass(threeFourSegmentTable, day, 
								classesTime, cellText); 
			fiveSixSegmentTable = 
					addClass(fiveSixSegmentTable, day, 
								classesTime, cellText); 
			break;
	}
}

function addClass(timeTable, day, classTime, cellText){
	for (var i = 0; i < classTime.length; ++i){
		let time = classTime[i]
		timeTable[day][time] = cellText
	}
	return timeTable
}

function parseTable(){
	let div = document.createElement("div")
	div.id = "printTimeTableDiv"
	div.style = "font-size: 20px;" + 
				"text-align: left;" + 
				"background-color: white;" +
				"padding: 10px"
	let innerHtmlText = `Report generated on ${new Date()}<br>`
	innerHtmlText = innerHtmlText + "If you find any discrepancy please write to <strong><em>cs18btech11052@iith.ac.in</em></strong><br>"
	innerHtmlText = innerHtmlText + "Press Ctrl + P to download in pdf format<br><br>"
	if (errorMessages.length > 0){
		innerHtmlText = innerHtmlText + "Following problems were detected:<br>"
		innerHtmlText = innerHtmlText + `<span style='color: red'>${errorMessages.join("<br>")}</span><br><br>`
	}
	innerHtmlText = innerHtmlText + "<span>Time table for segment 1-2</span><br>"
	innerHtmlText = innerHtmlText + generateTable(oneTwoSegmentTable)
	innerHtmlText = innerHtmlText + "<span>Time table for segment 3-4</span><br>"
	innerHtmlText = innerHtmlText + generateTable(threeFourSegmentTable)
	innerHtmlText = innerHtmlText + "<span>Time table for segment 5-6</span><br>"
	innerHtmlText = innerHtmlText + generateTable(fiveSixSegmentTable)
	div.innerHTML = innerHtmlText
	var newWindow = window.open()
	let documentText = "<!DOCTYPE html>" + 
						"<html>" + 
						"<head>" + 
							"<link rel='icon' href='https://pbs.twimg.com/profile_images/833355550167412736/vmQsHdIj_400x400.jpg' type='image/gif' sizes='16x16'>" +
							"<style>" + 
								"table, th, td {" + 
									"border: 1px solid black;" + 
									"border-collapse: collapse;" + 
								"}" + 
								"td {" +
									"padding: 5px;" +
								"}" +
							"</style>" +
							"<title>AIMS - Generated Time Table</title>" +
						"</head>" +
							"<body>" + 
								div.innerHTML +  
							"</body>" + 
						"</html>"
	newWindow.document.write(documentText)	
}

function generateTable(timeTable){
	const monday = timeTable['Monday']
	const tuesday = timeTable['Tuesday']
	const wednesday = timeTable['Wednesday']
	const thursday = timeTable['Thursday']
	const friday = timeTable['Friday']
	let htmlText = "<table style='font-size: 15px;'>" + 
						"<tr>" + 
							"<td>" + '' + "</td>" + 
							"<td>" + 'Monday' + "</td>" + 
							"<td>" + 'Tuesday' + "</td>" + 
							"<td>" + 'Wednesday' + "</td>" + 
							"<td>" + 'Thursday' + "</td>" + 
							"<td>" + 'Friday' + "</td>" +
						"</tr>"
	let timings = ['09:00-09:55','10:00-10:55',
					'11:00-11:55','12:00-12:55',
					'14:30-15:55','16:00-17:25',
					'18:00-19:25','19:30-21:00']
	for (var i = 0; i < timings.length; ++i){
		let time = timings[i]
		htmlText = htmlText +
						"<tr>" + 
							"<td>" + time + "</td>" + 
							"<td>" + monday[time] + "</td>" + 
							"<td>" + tuesday[time] + "</td>" + 
							"<td>" + wednesday[time] + "</td>" + 
							"<td>" + thursday[time] + "</td>" + 
							"<td>" + friday[time] + "</td>" + 
						"</tr>"		
	}
	htmlText = htmlText + 
					"</table>" + 
					"<br> <br>"
	return htmlText
}

function createSegmentTable(){
	const segmentTable ={
		'Monday': {
			'09:00-09:55': '',
			'10:00-10:55': '',
			'11:00-11:55': '',
			'12:00-12:55': '',
			'14:30-15:55': '',
			'16:00-17:25': '',
			'18:00-19:25': '',
			'19:30-21:00': ''
		},
		'Tuesday': {
			'09:00-09:55': '',
			'10:00-10:55': '',
			'11:00-11:55': '',
			'12:00-12:55': '',
			'14:30-15:55': '',
			'16:00-17:25': '',
			'18:00-19:25': '',
			'19:30-21:00': ''
		},
		'Wednesday': {
			'09:00-09:55': '',
			'10:00-10:55': '',
			'11:00-11:55': '',
			'12:00-12:55': '',
			'14:30-15:55': '',
			'16:00-17:25': '',
			'18:00-19:25': '',
			'19:30-21:00': ''
		},
		'Thursday': {
			'09:00-09:55': '',
			'10:00-10:55': '',
			'11:00-11:55': '',
			'12:00-12:55': '',
			'14:30-15:55': '',
			'16:00-17:25': '',
			'18:00-19:25': '',
			'19:30-21:00': ''
		},
		'Friday': {
			'09:00-09:55': '',
			'10:00-10:55': '',
			'11:00-11:55': '',
			'12:00-12:55': '',
			'14:30-15:55': '',
			'16:00-17:25': '',
			'18:00-19:25': '',
			'19:30-21:00': ''
		},
	}
	return segmentTable;
}
