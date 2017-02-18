clock.stop().setFaceValue(100).start(function() {
	setTimeout(function() {
		clock.stop().reset().start();
	}, 3000);
});