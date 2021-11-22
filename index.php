<? php
    require_once __DIR__ ./config.php;

    class API {
        
        public function  login($userName, $password): string{
            if ($userName && $password){
                $sql = "SELECT * FROM User WHERE email = ?";
                $stmt = (new Connection)->connect()->prepare($sql);
                $stmt->execute([$userName]);
                $result = $stmt->fetchAll();
    
                if(!$result){
                    return "Your user name or password is wrong";
                }
                else{
                    $resultRow = $result[0];
                    if($password == $resultRow['password']){
                        return "Successfully Loged In";                    }
                    else{
                        return "Your user name or password is wrong";
                    }
                }
            }
            return "Warning: must give username and password";
        }

        public function Users()
        {
            $users = array();
            $sql = "SELECT * FROM User ORDER BY id" ;
            $data = (new Connection)->connect()->prepare($sql);
            $data->execute();
            while ($output = $data->fetch(PDO::FETCH_ASSOC)) {
                $users[$output['id']] =  array(
                'id' => $output['id'], 
                );
            }
            return json_encode($users);
        }
    }
    
    $API = new API;
    header("Content-Type: application/json");
    echo $API->Users();
?>