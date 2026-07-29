const register=async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server issue in registering user.", error:error.message});
    }
}

const login = async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server issue in logging in user.", error:error.message});        
    }
}

const logout= async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server issue in logging out user.", error:error.message});        
    }
}