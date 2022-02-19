const cv = require('opencv4nodejs');

const mat = cv.imread('test1.jpg');
cv.imwrite('test1_node.png', mat);

// show image
// cv.imshow('a window name', mat);
// cv.waitKey();