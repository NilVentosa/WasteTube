chrome.tabs.onUpdated.addListener((tabId, _, __) => {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		var activeTab = tabs[0];
		var activeTabUrl = activeTab.url;
		if (activeTabUrl.includes("youtube.com")) {
			chrome.scripting.executeScript({
				target: { tabId: tabId },
				function: showDialog
			});
		}
	});
});

function showDialog() {
	const overlayId = 'wasteTube';
	if (!document.getElementById(overlayId)) {
		const overlay = document.createElement('div');
		overlay.id = overlayId;
		
		overlay.style.position = 'fixed';
		overlay.style.top = '0';
		overlay.style.left = '0';
		overlay.style.right = '0';
		overlay.style.bottom = '0';
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		overlay.style.zIndex = '2147483647';
		overlay.style.display = 'flex';
		overlay.style.justifyContent = 'center';
		overlay.style.alignItems = 'center';
		
		const dialogHTML = `
			<div style="background: white; padding: 20px; border-radius: 5px; box-shadow: 2px 2px 10px rgba(0,0,0,0.5);">
				<p>Please type "let me waste my life" to continue:</p>
				<input type="text" id="lifeWasteInput" autocomplete="off" style="margin-bottom: 10px; width: 250px;" />
				<button id="submitButton">Submit</button>
			</div>
		`;
		overlay.innerHTML = dialogHTML;
		document.body.appendChild(overlay);
		
		const inputBox = document.getElementById('lifeWasteInput');
		if (inputBox) inputBox.focus();
		
		document.getElementById('submitButton').addEventListener('click', function() {
			const userInput = document.getElementById('lifeWasteInput').value;
			if (userInput === 'let me waste my life') {
				overlay.remove();
			}
		});
		
		document.getElementById('lifeWasteInput').addEventListener('keypress', function(event) {
			if (event.key === 'Enter') {
				document.getElementById('submitButton').click();
			}
		});
	}
}
