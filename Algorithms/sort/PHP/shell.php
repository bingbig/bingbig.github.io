<?php
function shell_sort($array) {
	$length = count($array);
	if ($length < 2) {
		return $array;
	}

	$step = (int) ceil($length / 2);
	while ($step > 0) {
		for ($i = $step; $i < $length; $i++) {
			$j = $i;
			while ($j >= $step && $array[$j - $step] > $array[$i]) {
				$tmp = $array[$j - $step];
				$array[$j - $step] = $array[$i];
				$array[$i] = $tmp;
				$j -= $step;
			}
		}

		$step--;
	}
}

var_dump(shell_sort([7, 6, 5, 4, 9, 0, 3, 2, 1]));