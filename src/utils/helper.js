function getBrandIndex(brand) {
	if (brand === "Apple") return 0;
	else if (brand === "Asus") return 1;
	else if (brand === "Blackberry") return 2;
	else if (brand === "CAT") return 3;
	else if (brand === "Google") return 4;
	else if (brand === "Huawei") return 5;
	else if (brand === "LG") return 6;
	else if (brand === "Motorola") return 7;
	else if (brand === "Nokia") return 8;
	else if (brand === "OnePlus") return 9;
	else if (brand === "Oppo") return 10;
	else if (brand === "Realme") return 11;
	else if (brand === "Samsung") return 12;
	else if (brand === "Sony") return 13;
	else if (brand === "Vivo") return 14;
	else return 15;
}

export { getBrandIndex };
