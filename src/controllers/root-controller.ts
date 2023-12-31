import { Request, Response } from "express";

export function helloController(_: Request, res: Response) {
  res.json({ serverMessage: getHello() });
}

export function getHello() {
  return "Hello World!";
}
