"use strict";
$(function () {
	setInterval(function () {
		let STATES = {
			Operational: "Idle",
			Printing: "Drucke",
		};
		$.ajax("/api/job", {
			success: (data, text, xhr) => {
				if (data.status && data.status.job && data.status.progress) {
					let format =
						data.status.progress.printTime <= 90 ? "sekunden" : "minuten";
					let duration_elapsed = moment
						.duration({ seconds: data.status.progress.printTime }, format)
						.humanize();
					let duration_remaining =
						STATES[data.status.state] === STATES.Operational
							? "fertig"
							: "berechne...";
					if (data.status.progress.printTimeLeft) {
						let format =
							data.status.progress.printTimeLeft <= 90 ? "sekunden" : "minuten";
						duration_remaining = moment
							.duration({ seconds: data.status.progress.printTimeLeft }, format)
							.humanize();
					}

					var unix_timestamp = Date.now();
					var today = new Date(
						unix_timestamp + data.status.progress.printTimeLeft * 1000
					);
					var h = today.getHours();
					var m = today.getMinutes();
					var s = today.getSeconds();
					// add a zero in front of numbers<10
					m = checkTime(m);
					s = checkTime(s);

					$("#print_ETA").html(h + ":" + m + ":" + s);
				}
			},
		});
	}, 1000);
});

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
