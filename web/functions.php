<?php 
    function getMatters(){
        $cnx = cnx();
        $sql = "SELECT name from matter";
        $res = $cnx->query($sql);
        $matters = array();

        if($res->num_rows > 0) {
            while($row = $res->fetch_assoc()){
                array_push($matters, $row['name']);
            }
        }
        return $matters;
    }
z