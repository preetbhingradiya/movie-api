const Movie = require("../Models/movie.schema")


const addMovie=async(req,res)=>{
    const added= await Movie.create(req.body)
    res.status(201).send(added)
}

const updateMovie=async(req,res)=>{
    let updated= await Movie.findByIdAndUpdate(req.params.id,req.body)
    updated=await Movie.findById(req.params.id)
    res.status(200).send(updated)
}

const deleteMovie=async(req,res)=>{
    let remove= await Movie.findByIdAndDelete(req.params.id)
    remove=await Movie.findById(req.params.id)
    res.status(200).send({message:"Movie deleted"})
}

const ratingMovie=async(req,res)=>{
    let movie=await Movie.findById(req.params.id)
    if(!movie) return res.send({error: "movie not found"});

    movie.ratings.push({value:req.body.rating})
    await movie.save()
    res.send(movie)
}

const commentMovie=async(req,res)=>{
    let movie=await Movie.findById(req.params.id)
    if(!movie) return res.send({error: "movie not found"});
    
    movie.comments.push({text:req.body.text})
    await movie.save()
    res.send(movie)
}

const findeMovie=async(req,res)=>{
    const {title,addedBy,releaseDate,category}=req.query

    if(title||addedBy||releaseDate||category){
        const show=await Movie.find(req.query)
        res.send(...show)
    }

    const movie=await Movie.find()
    res.send(movie)
}

module.exports={addMovie,updateMovie,deleteMovie,ratingMovie,commentMovie,findeMovie}