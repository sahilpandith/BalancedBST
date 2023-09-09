

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


function Node(data) {
    return {
        data,
        left:null,
        right:null
    }
}


function BuildTree(array,start=0,end=array.length-1) {
    if(start>end){
        return null
    }
    const mid = Math.floor((start+end)/2);
    const root = Node(array[mid]);
    root.left = BuildTree(array,start,mid-1);
    root.right = BuildTree(array,mid+1,end);
    return root
}


function insertIntoBST(root,value){
    if(!root){
      return Node(value)
    }
    if(root.data>value){
       root.left = insertIntoBST(root.left,value)
    }else{
       root.right = insertIntoBST(root.right,value)
    }
    return root

}

function deleteNodeFromBST(root, value){
  if(root.data===value){
       // delete leaf node
       if(!(root.left || root.right)){
          root=null;
       } 
       // delete node with one child (right child)
       else if(root.left===null && root.right!=null){
           root = root.right;
       }
       // delete node with one child (left child)
       else if(root.right===null && root.left!=null){
           root = root.left;
       }
       // delete node with both child 
       else if(root.left && root.right){
           let tempRoot  = root.right;
           let temp;
           while(tempRoot.left){
                temp = tempRoot;
                tempRoot = tempRoot.left
           }
           root.data = tempRoot.data;
           if(tempRoot.right){
               temp.left = tempRoot.right
           }else {
             temp.left = null;
           }
       }
       return root;
  }else if(root.data<value){
    root.right= deleteNodeFromBST(root.right,value);
  }else {
    root.left = deleteNodeFromBST(root.left,value);
  }
  return root
}


function find(root, value) {
  if(!root){
    return null
  }
  if(root.data===value){
        return root
  }else{
     if(root.data>value){
        return find(root.left,value);
     }else{
      return find(root.right,value);
     }
  }
}


let array = [...new Set([1,7,4,23,8,9,4,3,5,7,9,67,5345,324].sort((a,b) => a-b))];

prettyPrint(BuildTree(array))

let root = BuildTree(array);

prettyPrint(insertIntoBST(root,2));
prettyPrint(insertIntoBST(root,100));
prettyPrint(insertIntoBST(root,101));
prettyPrint(insertIntoBST(root,102));

prettyPrint(deleteNodeFromBST(root,3));
// prettyPrint(deleteNodeFromBST(root,7));
prettyPrint(deleteNodeFromBST(root,8));



prettyPrint(find(root,67));



function levelOrderR(root){
  let q = [];
  q.push(root);
  function func(queue,leveOrderArray=[]){
    if(queue.length===0){
      return leveOrderArray
    }else{
      const item = queue.shift();
      leveOrderArray.push(item.data);
      item.left && queue.push(item.left);
      item.right && queue.push(item.right)
      return func(queue,leveOrderArray);
    }  
  }
  return func(q);
}

function levelOrderS(root,leveOrderArray=[]) {
  const queue = []
  queue.push(root);
  while(queue.length!==0){
    const item = queue.shift();
      leveOrderArray.push(item.data);
      item.left && queue.push(item.left);
      item.right && queue.push(item.right)
  }
  return leveOrderArray
}

console.log(levelOrderR(root));
console.log(levelOrderS(root));

//DLR
function PreOrder(root,preOrderArray=[]){
      if(!root){
        return null
      }
      preOrderArray.push(root.data);
      PreOrder(root.left,preOrderArray);
      PreOrder(root.right,preOrderArray);
      return preOrderArray;
}


//LDR
function InOrder(root,inOrderArray=[]){
  if(!root){
    return null
  }
  InOrder(root.left,inOrderArray);
  inOrderArray.push(root.data);
  InOrder(root.right,inOrderArray);
  return inOrderArray;
}


//LRD
function PostOrder(root,postOrderArray=[]){
  if(!root){
    return null
  }
  PostOrder(root.left,postOrderArray);
  PostOrder(root.right,postOrderArray);
  postOrderArray.push(root.data);
  return postOrderArray;
}
console.log("==========preorder starts================");
console.log(PreOrder(root))
console.log("==========preorder ends================\n");
console.log("==========Inorder starts================");
console.log(InOrder(root));
console.log("==========In order ends================\n");
console.log("==========Post order starts================");
console.log(PostOrder(root));
console.log("==========Post order ends================\n");

//counted upwards
function depth(root,value,d=0){
  if(root.data==value){
        return d
  }
  if(root.data<value){
        return depth(root.right,value,++d)
  }else if(root.data>value){
        return depth(root.left,value,++d)
  }
  return d;
}

//counted downwards
function height(root, value){
    const node = find(root,value);
    if(!node){
      return null
    }
    function hgt(node){
        if(!node){
          return -1;
        }
        const lft = hgt(node.left);
        const rgt = hgt(node.right);
        return Math.max(lft,rgt) + 1 ;
    }

    return hgt(node);
   
}

prettyPrint(root);
console.log('depth of 23',depth(root,23));
console.log('depth of 324',depth(root,324));
console.log('depth of 9',depth(root,9));

console.log('height of 23',height(root,23));
console.log('height of 5',height(root,5));
console.log('height of 9',height(root,9));

function isBalanced(root){
  if(!root) return true;

  const lt = height(root.left,root.left?.data);
  const rt = height(root.right,root.right?.data);

  if(Math.abs(lt-rt)<=0 && isBalanced(root.left) && isBalanced(root.right)){
    return true;
  }
  return false;
}

function rebalance(root){
  const sortedArray = InOrder(root)
  return BuildTree(sortedArray);
}

prettyPrint(root);
console.log('isBalanced', isBalanced(root));
root = rebalance(root);
prettyPrint(root);
console.log('isBalanced', isBalanced(root));