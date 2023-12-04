import { hash } from 'bcrypt';
import { AppDataSource } from '@shared/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@domain/accounts/entities/User';
import readlineSync from 'readline-sync';

async function createUser() {
    const usersRepository = AppDataSource.getRepository(User);
    const name = readlineSync.question('Informe o nome: ');
    const email = readlineSync.question('Informe o email: ');
    const password = readlineSync.question('Informe a senha: ',{
        min: 8,
    });
    const isAdminInput = readlineSync.keyInYNStrict('É um administrador?');
    
    const isAdmin = isAdminInput;
    
    const id  = uuidv4();
    const passwordEncrypted = await hash(password, 8);  
    
    const user = Object.assign(new User(),{
        id,
        name: name, 
        email: email,
        password: passwordEncrypted, 
        isAdmin: isAdmin, 
        driver_license: "000000000",
    });
    
    const userExists = await usersRepository.findOne({ where: { email } });
    
    if (userExists) {
        console.log("Usuário já existe.");
        return;
    }
    
    try {
        await usersRepository.save(user);
        console.log(`Usuário ${user.name}, ${user.email}, ${user.isAdmin ? "é adm,": "não adm,"} criado com sucesso!
        `);

    } catch (err) {
        console.error("Erro ao criar usuário:", err);
    }
}
 
AppDataSource.initialize().then(async () => {
    await createUser(); 
    process.exit();
}).catch(err => {
    console.error("Erro ao inicializar a fonte de dados:", err);
    process.exit(1);
});
