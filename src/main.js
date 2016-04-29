const VIEW = new Canvas();
VIEW.width = 2000;
VIEW.height = 2000;

const CONTROLLER = new Controller(VIEW);

document.body.appendChild(VIEW.element);
document.body.appendChild(CONTROLLER.element);

