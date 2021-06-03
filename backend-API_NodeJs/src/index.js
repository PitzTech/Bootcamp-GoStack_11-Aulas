const express = require("express")
const { v4, validate } = require("uuid")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost:8080"
}))
app.use(express.json())
app.use(logRequests)
app.use("/project/:id", validateProjectId)

const projects = []

function logRequests(request, response, next){
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

function validateProjectId(request, responde, next){
    const { id } = request.params
    
    if(!validate(id))
        return response.status(400).json({ error: "Invalid Project ID." })

    return next()
}



app.get("/projects", (request, response) => {
    const { title, owner} = request.query;

    const results = title 
                ? projects.filter(project => project.title.includes(title))
                : projects

    return response.json(results)
})

app.post("/projects", (request, response) => {
    const { title, owner } = request.body;

    const project = { id: v4(), title, owner }
    
    projects.push(project)

    return response.json(project)
})

//update
app.put("/projects/:id", (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body

    const projectIndex = projects.findIndex(project => project.id == id)

    // if(projectIndex < 0){
    //     return response.status(400).json({
    //         error: "Project not found."
    //     })
    // }

    const project = {
        id,
        title,
        owner
    }
    
    projects[projectIndex] = project

    return response.json(project)
})

app.delete("/projects/:id", (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id == id)

    // if(projectIndex < 0){
    //     return response.status(400).json({
    //         error: "Project not found."
    //     })
    // }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})



app.listen(3333, () => console.log("🚀 Back-end Started"))