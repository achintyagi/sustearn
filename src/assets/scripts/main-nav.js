const body = document.querySelector("body");
const nav = document.querySelector("#mainnav");
const listContainer = nav.querySelector(".mainnav-list-container");
const burgerClone = document
	.querySelector("#burger-template")
	.content.cloneNode(true);
const button = burgerClone.querySelector("button");

button.addEventListener("click", (e) => {
	const isOpen = button.getAttribute("aria-expanded") === "false";
	button.setAttribute("aria-expanded", isOpen);

	// close if clicked outside of event target
	document.addEventListener(
		"click",
		(e) => {
			const isClickInsideElement = nav.contains(e.target);
			if (!isClickInsideElement) {
				disableMenu();
				console.log("running");
			}
		},
		{ capture: true, once: true }
	);
});

// DRY: disabling menu
const disableMenu = () => {
	button.setAttribute("aria-expanded", false);
	button.focus();
};

//  close on escape
nav.addEventListener("keyup", (e) => {
	if (e.code === "Escape") {
		disableMenu();
	}
});

nav.insertBefore(burgerClone, listContainer);
