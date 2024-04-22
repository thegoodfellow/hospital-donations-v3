# GRAPHIC INTERFACE

## ENTRY PAGE

The entry page is made by the components:
- TopBar
- SideBar
- Header
- Box

![screenshot of the entry page](UI_scrrenschots/entry_page.png)

### TOPBAR

In the middle of the TopBar is located a motto with a logo in between the 2 word composing it.
On the right side several icons are located, the moon icon allows to switch from the bright mode to the dark mode.
Once the moon icon is licked it is switched with a sun icon and most of the colors of the site are switched to brighter ones.
     
![screenshot of the TopBar](UI_scrrenschots/TopBar.png)

### HEADER

![screenshot of the header of the entry page](UI_scrrenschots/header_entry_page.png)

### PAGE CONTENT

The page content is made by a `<Box>`, with the property ```display="grid"```, with 3 rows, in each of those there are other Box with the property ```gridColumn="span 4"```.
The toatal number of columns per row is 12 as designed by MUI library.
In the first row are located 3 `<StatBox>` with few statistics on the Smart Contract.
In the second row, on the left-side there is the component `<DonationChart>`, displaying the latest donations in a bar chart, and a list of latest donations on the rigth-side.
On the third row is located the component `<MintedNFTsChart>`, diplsaying how many NFTs have been minted per type by the Smart Contract.
All the data showed in the page are made up and the interactions with Smart Contract on the BlockChain have to be implemented.

![screenshot of the entry page content](UI_scrrenschots/entry_page_content.png)

### SIDEBAR

![screenshot of the SideBar with no wallet connected](UI_scrrenschots/SideBar_no_wallet.png)