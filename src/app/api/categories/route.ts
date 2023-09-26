import myJson from '../dataSource.json' assert {type: 'json'};
import { NextResponse } from "next/server";

export async function GET(){
    const categories = myJson.categories;

    return NextResponse.json(categories)
}
