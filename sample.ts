interface User {
  username: string;
  email: string;
  age: number;
}

function isValidUser(user: any): boolean {
  if (typeof user !== 'object' || user === null) {
    return false;
  }

  const requiredFields: (keyof User)[] = ['username', 'email', 'age'];

  return requiredFields.every(field => {
    switch (field) {
      case 'username':
      case 'email':
        return typeof user[field] === 'string' && user[field].trim() !== '';
      case 'age':
        return typeof user[field] === 'number' && user[field] >= 0;
      default:
        return false;
    }
  });
}

// Example usage:
const user = { username: 'JohnDoe', email: 'john@example.com', age: 25 };
console.log(isValidUser(user)); // Output: true

