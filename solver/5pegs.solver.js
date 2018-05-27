"use strict";

const _ = require('underscore');
const green = 'green';
const yellow = 'yellow';
const red = 'red';
const orange = 'orange';
const purple = 'purple';
const blue = 'blue';

const PUZZLE_COLORS = [yellow, purple, blue, red, orange, green];

const rules = [
    {
        colors: [blue, red, blue, yellow, yellow],
        matches: 0,
        differences: 0
    },
    {
        colors: [purple, orange, orange, orange, yellow],
        matches: 2,
        differences: 1
    },
    {
        colors: [green, purple, blue, purple, orange],
        matches: 1,
        differences: 2
    },
    {
        colors: [yellow, green, red, orange, orange],
        matches: 3,
        differences: 0
    },
    {
        colors: [red, purple, blue, green, purple],
        matches: 0,
        differences: 2
    }

];

console.log(findSolution(PUZZLE_COLORS, rules));

function findSolution(potentialColorsInSolution, rulesList) {
    //Generate and test all possible solutions
    let solution = {};

    //Generate first slot
    for (let firstColorIndex = 0; firstColorIndex < potentialColorsInSolution.length; firstColorIndex++) {
        //Generate second slot
        for (let secondColorIndex = 0; secondColorIndex < potentialColorsInSolution.length; secondColorIndex++) {
            //Generate third slot
            for (let thirdColorIndex = 0; thirdColorIndex < potentialColorsInSolution.length; thirdColorIndex++) {
                //Generate the fourth slot
                for (let fourthColorIndex = 0; fourthColorIndex < potentialColorsInSolution.length; fourthColorIndex++) {
                    //Generate the fifth slot
                    for (let fifthColorIndex = 0; fifthColorIndex < potentialColorsInSolution.length; fifthColorIndex++) {
                        //Add in the colors
                        solution = [
                            potentialColorsInSolution[firstColorIndex],
                            potentialColorsInSolution[secondColorIndex],
                            potentialColorsInSolution[thirdColorIndex],
                            potentialColorsInSolution[fourthColorIndex],
                            potentialColorsInSolution[fifthColorIndex]
                        ];


                        if (isSolutionCorrect(solution, rulesList)) {
                            return solution;
                        }
                    }
                }


            }
        }
    }


}


function isSolutionCorrect(solution, rulesList) {
    return _.every(rulesList, function (rule) {
        return isSolutionCompatibleWithRule(solution, rule)
    });
}


function isSolutionCompatibleWithRule(solution, rule) {
    return hasCorrectNumberOfMatchesAndDifferences(solution, rule);
}

function hasCorrectNumberOfMatchesAndDifferences(solution, rule) {
    let totalMatches = 0;
    let totalDifferences = 0;

    let localCopyOfRuleColorsForMatches = JSON.parse(JSON.stringify(rule.colors));
    let localCopyOfRuleColorsForDifferences = JSON.parse(JSON.stringify(rule.colors));
    let localCopyOfSolution = JSON.parse(JSON.stringify(solution));
    


    for (let solutionColorIterationIndex = 0; solutionColorIterationIndex < solution.length; solutionColorIterationIndex++) {
        for (let ruleColorIterationIndex = 0; ruleColorIterationIndex < localCopyOfRuleColorsForMatches.length; ruleColorIterationIndex++) {
            if (solutionColorIterationIndex === ruleColorIterationIndex && solution[solutionColorIterationIndex] === localCopyOfRuleColorsForMatches[ruleColorIterationIndex]) {
                //Same Color, Same spot
                totalMatches++;
                localCopyOfRuleColorsForDifferences[ruleColorIterationIndex] = null;
                localCopyOfSolution[solutionColorIterationIndex] = null;
                break;
            }


        }
    }

    if (totalMatches !== rule.matches) {
        return false;
    }

    let differencePoolFromSolution =  _.without(localCopyOfSolution, null);
    let localRule = {
        differences: rule.differences,
        colors:  _.without(localCopyOfRuleColorsForDifferences, null)
    };

    return totalMatches === rule.matches
        && hasCorrectNumberOfDifferences(differencePoolFromSolution, localRule);

}

function hasCorrectNumberOfDifferences(solution, rule) {
    let totalDifferences = 0;

    let localCopyOfRule = JSON.parse(JSON.stringify(rule));
    let localCopyOfRuleColors = localCopyOfRule.colors;


    for (let solutionColorIterationIndex = 0; solutionColorIterationIndex < solution.length; solutionColorIterationIndex++) {
        for (let ruleColorIterationIndex = 0; ruleColorIterationIndex < localCopyOfRuleColors.length; ruleColorIterationIndex++) {
            if (solution[solutionColorIterationIndex] === localCopyOfRuleColors[ruleColorIterationIndex]) {
                //Same Color
                localCopyOfRuleColors[ruleColorIterationIndex] = null;
                totalDifferences++;
                break;
            }


        }
    }
    return totalDifferences === rule.differences;

}




