<?php
    class Connection
    {
        private $host;
        private $dbname;
        private $userName;
        private $pass;
    
        public function __construct()
        {
            $this->host = "localhost";
            $this->userName = "root";
            $this->dbname = "exam";
            $this->pass = "";
        }
        protected function connect()
        {
            $dsn = 'mysql:host='.$this->host.';dbname='.$this->dbname;
            $pdo = new \PDO($dsn,$this->userName,$this->pass);
            $pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE,\PDO::FETCH_ASSOC);
            return $pdo;
        }
    }
?>