<?php
function insertion_sort($array) {
	$length = count($array);
	if ($length <= 1) {
		return $array;
	}
	for ($i = 1; $i < $length; $i++) {
		var_dump($array);
		for ($j = $i - 1; $j >= 0; $j--) {
			if ($array[$i] < $array[$j]) {
				$min = $array[$i];
				$array[$i] = $array[$j];
				$array[$j] = $min;
			} else {
				break;
			}
		}
	}
	return $array;
}

var_dump(insertion_sort([7, 6, 5, 4, 9, 0, 3, 2, 1]));