class Node{
    constructor(){
        this.left = null;
        this.right = null;
        this.operation = null;
    }

    isNotNull(){
        if (this.left != null && this.right != null && this.operation != null)return true;
        else return false;
    }
    setLeft(value){this.left = value;}
    
    setRight(value){this.right = value;}

    setOperation(operation){this.operation = operation;}

    setLeftOrRight(value){
        if(this.left == null)this.left = value;
        else this.right = value;
    }

    getValue(){
        //if(!this.isNotNull()) return "Mauvaise synthaxe, parsing incomplet";
        if(this.operation != null){
            if(this.left instanceof Node){this.left = this.left.getValue()}
            if(this.right instanceof Node){this.right = this.right.getValue()}

            //Test ou fait les opérations
            if(this.operation == "+"){return this.left + this.right;}
            if(this.operation == "-"){return this.left - this.right;}
            if(this.operation == "*"){return this.left * this.right;}
            if(this.operation == "/"){return this.left / this.right;} 
            if(this.operation == "%"){return this.left % this.right;}
        }
        else return false;
    }
    afficheNode(){
        console.log("Info sur me node");
        console.log(this.left);
        console.log(this.right);
        console.log(this.operation);
    }
}

module.exports = Node