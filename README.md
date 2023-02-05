# choosing-a-clothing-collection

## Project Description

This project allows the user to sort sets of clothes according to their decision. The algorithm recommends different clothing items according to the size and color the user chose.

## Instructions on How to Run

**After downloading the folder you need to run in the terminal:**

`npn install`

`npm run dev`

**To run in dev mode:**

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view it in your browser.

**Alternatively, to run in production mode:**

`npm run build`

`npm run preview`

.

## Cloth Choosing Algorithm

The sizes were paired in the following way:

- Shoes 36,37 with pants 30,31,32 with shirt S.
- Shoes 39 with pants 34,35,36 with shirt L.
- Shoes 43 with pants 39,42,43 with shirt XL.
- Shoes 45,46 with pants 48 with shirt XXL.

## Menu

###### Home

- The screen for clothing items. Contains three buttons of item choice and on them have the number of items in stock of every item type.

###### Collection

- Contains saved triples of pants, shirt, shoes. Each has a Delete button to delete that specific set.
