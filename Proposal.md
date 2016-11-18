# Mask model proposal

## Definitions

### Placeholders:

* Accept user inputs
* Allows to define character Groups
* Anything not defined as a placeholder is treated as a fixed character
* User can define his own placeholders, or even turn of some placeholders to use them as fixed char:
```javascript
	placehoders: {
		'b': /[01]/  //placeholder for binary numbers,
		'H' : '#'    //Define 'H' char to be the same as '#'
		'#': false   //disable '#' placeholder
	}
```
#### Ex:
		9: numbers
		#: hexadecimal
		A: capital letters
		a: letters
		n: digit (number and letters)

### Fixed chars:
* Are automatically applyed to an input:
	* After the next char is entered (char in the middle of the brackets): 
		* `mask: ['{99-99}']`: [12_  ], [12-3_]
	* On entering on a group (fixed chars on left side of brackets):
		* `mask: ['{A}','{-9}']`: [_  ], [X-_]
	* On leaving a group:  (fixed chars on  side of brackets):
		* mask: ['{A}','{9-}','{9}'] : [X9  ], [X9-6]
	* On repetitions, they chars are applied to the entire repetition according where the repetition sign resides:
		* on left side (put from right to left): {.99}+ : [9.99]
		* on right side (put from left to right): +{.99} : [.99.9]
		* **?Does not make sense to chars in the middle?**

### Groups
* Delimited by {}
* Repetition: {9}+
	* Group is reactivated as soon as his pattern is achieved
	* **?Allow fixed repetition? {9}+10**
	* **?Allow optional ocurrences? {9}**
	* **?Allow variable ocurrences? {9}+1-3 (1 to 3), {9}* (0 to infinity)**
* Activated when:
	* Last group deactivated (by pattern)
	* First key is pressed. **?Configurable?** :{,99}
* Deactivated when:
	* Pattern achieved
	* Next group is activated (by key)


## Usage Options

TODO	

## Usage examples:
```javascript
	{ 'mask': '99.999-999' }   //CEP, simple mask
	{ 'mask': ['{-}?', 'R$', '+{.999}', ':{,99}'] }   //Money (Real)
	{ 'mask': ['{B}+'], 'placehoders': {'B': /[0-1]/} } //Custom placeholder (binary) 
```

