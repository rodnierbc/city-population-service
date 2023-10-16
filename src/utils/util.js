// Function to format a string with the first letter capitalized and the rest in lowercase
function formatString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = { formatString };
