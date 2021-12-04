import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, units, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    console.log(req.body);
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});


/**
 * Retrieve the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null){
                res.json(exercise);
            }
            else {
                res.status(404).json({Error: 'Resource not found'});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request failed'});
        })
});

/**
 * Retrieve exercises. 
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises({},'',0)
        .then(exercises => {
            if(exercises !== null){
                res.json(exercises);
            }
            else{
                res.status(404).json({Error: 'Resource not found'});
            }
            
        })
        .catch(error => {
            res.status(400).json({Error: 'Request failed'});
        })
  
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, units, and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});