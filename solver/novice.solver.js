"use strict";

const _ = require('underscore');
const green = 'green';
const yellow = 'yellow';
const red = 'red';
const orange = 'orange';
const purple = 'purple';
const blue = 'blue';

const PUZZLE_COLORS = [purple, green, blue, orange];




const rules = [
    {
        colors: [purple, blue, blue],
        matches: 1
    },
    {
        colors: [orange, purple, purple],
        matches: 2
    },
    {
        colors: [purple, purple, purple],
        matches: 2
    },
    {
        colors: [green, orange, orange],
        matches: 1
    }
];

console.log(findSolution(PUZZLE_COLORS, 3, rules));

function findSolution(potentialColorsInSolution, solutionSize, rulesList) {
    //Generate and test all possible solutions
    let solution = {};

    //Generate first slot
    for (let firstColorIndex = 0; firstColorIndex < potentialColorsInSolution.length; firstColorIndex++) {
        //Generate second slot
        for (let secondColorIndex = 0; secondColorIndex < potentialColorsInSolution.length; secondColorIndex++) {
            //Generate third slot
            for (let thirdColorIndex = 0; thirdColorIndex < potentialColorsInSolution.length; thirdColorIndex++) {
                //Add in the colors
                solution = [
                    potentialColorsInSolution[firstColorIndex],
                    potentialColorsInSolution[secondColorIndex],
                    potentialColorsInSolution[thirdColorIndex]
                ];


                if (isSolutionCorrect(solution, rulesList)) {
                    return solution;
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
    switch (rule.matches) {
        case 0:
            return hasNothingInCommon(solution, rule);
        case 3:
            return isAPerfectMatch(solution, rule);
        default:
            return hasCorrectNumberOfMatches(solution, rule);

    }
}

function hasCorrectNumberOfMatches(solution, rule) {
    let totalMatches = 0;

    let localCopyOfRule = JSON.parse(JSON.stringify(rule));
    let localCopyOfRuleColors = localCopyOfRule.colors;


    for (let solutionColorIterationIndex = 0; solutionColorIterationIndex < solution.length; solutionColorIterationIndex++) {
        for (let ruleColorIterationIndex = 0; ruleColorIterationIndex < localCopyOfRuleColors.length; ruleColorIterationIndex++) {
            if (solution[solutionColorIterationIndex] === localCopyOfRuleColors[ruleColorIterationIndex]) {
                //Same Color
                localCopyOfRuleColors[ruleColorIterationIndex] = null;
                totalMatches++;
                break;
            }


        }
    }
    return totalMatches === rule.matches;

}


function isAPerfectMatch(solution, rule) {
    return _.isEqual(solution, rule.colors);
}

function hasNothingInCommon(solution, rule) {

    return _.intersection(solution, rule.colors).length === 0;
}



