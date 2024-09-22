import faker from 'faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (numUsers) => {
    const users = [];

    for (let i = 0; i < numUsers; i++) {
        const hashedPassword = bcrypt.hashSync('coder123', 10);
        users.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: Math.random() > 0.5 ? 'user' : 'admin',
            pets: []
        });
    }

    return users;
};
