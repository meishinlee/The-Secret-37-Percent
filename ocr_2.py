# import cv2
# import numpy as np
# from matplotlib import pyplot as plt

# # Read the image
# img = cv2.imread('receipt.jpg',0)
# # Simple thresholding
# ret,thresh1 = cv2.threshold(img,210,255,cv2.THRESH_BINARY)
# cv2.imshow(thresh1, "gray")

import pytesseract
from pytesseract import Output
import cv2
import re

FILENAME = "receipt.png"
LANG = 'deu'

orig_img = cv2.imread(FILENAME)

# img = cv2.imread(FILENAME)
# d = pytesseract.image_to_data(img, output_type=Output.DICT)
# n_boxes = len(d['level'])
# for i in range(n_boxes):
#     (x, y, w, h) = (d['left'][i], d['top'][i], d['width'][i], d['height'][i])    
#     img = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)

# cv2.imshow("img", img)
# cv2.waitKey(0)

extracted_text = pytesseract.image_to_string(orig_img, lang = LANG)
# extracted_text = pytesseract.image_to_string(orig_img)

print(extracted_text)


receipt_ocr = {}
splits = extracted_text.splitlines()
restaurant_name = splits[0] + '' + splits[1]

# Date
# regex for date. The pattern in the receipt is in 30.07.2007 in DD:MM:YYYY

date_pattern = r'(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d'
date = re.search(date_pattern, extracted_text).group()
receipt_ocr['date'] = date
print(date)

# get lines with chf
lines_with_chf = []
for line in splits:
  if re.search(r'CHF',line):
    lines_with_chf.append(line)

print(lines_with_chf)
