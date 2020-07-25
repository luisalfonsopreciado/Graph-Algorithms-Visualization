const matrix = []
matrix[1] = [0, 3, Infinity, 7]
matrix[2] = [8, 0, 2, Infinity]
matrix[3] = [5, Infinity, 0, 1]
matrix[4] =[2, Infinity, Infinity, 0]

const n = 5

console.log(matrix)

// Update the matrix
for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j])
        }
    }
}

console.log(matrix)