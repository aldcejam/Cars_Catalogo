import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";

@Entity("Cars")
class Car{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
  
    @Column()
    daily_rate: number;

    @Column({
        default: true
    })
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;
    
    @Column({
        nullable: true
    })
    category_id: string;


    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4(); 
            this.available = true;
            this.created_at = new Date();
        }
    }

}

export { Car }