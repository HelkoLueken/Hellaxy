$filenameArray = [];

$handle = opendir('/images');
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..'){
                array_push($filenameArray, "images/$file");
            }
        }

echo json_encode($filenameArray);