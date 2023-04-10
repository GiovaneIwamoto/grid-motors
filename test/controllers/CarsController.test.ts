import { Request, Response } from 'express';
import { CreateCarsDTO } from '../../src/DTO';
import { CarsService } from '../../src/services';
import CarsController from '../../src/controllers/CarsController';
import CarRepository from '../../src/repositories/CarsRepository';
import { ICar } from '../../src/models/Cars';

describe('CreateCar', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let carsService: jest.Mocked<CarsService>;
    let carsController: CarsController;
    let createCarsDTO: CreateCarsDTO;

    beforeEach(() => {
        req = {
            body: {
                carModel: 'Mercedes',
                color: 'White',
                year: '2001',
                value_per_day: 500,
                accessories: [
                    { description: 'Leather' },
                    { description: 'Sunroof' },
                ],
                number_of_passengers: 4,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };

        createCarsDTO = {
            carModel: 'Mercedes',
            color: 'White',
            year: '2001',
            value_per_day: 500,
            accessories: [
                { description: 'Leather' },
                { description: 'Sunroof' },
            ],
            number_of_passengers: 4,
        };

        carsService = {
            CreateCar: jest
                .fn()
                .mockReturnValue(Promise.resolve(createCarsDTO)),
        } as unknown as jest.Mocked<CarsService>;

        carsController = new CarsController();
        carsController.carsService = carsService;
    });

    it('should return 201 with the created car', async () => {
        // Arrange
        jest.spyOn(res, 'status').mockReturnThis();
        jest.spyOn(res, 'json').mockReturnValueOnce(res as Response);
        jest.spyOn(carsController.carsService, 'CreateCar').mockReturnValue(
            Promise.resolve(createCarsDTO as ICar)
        );

        // Act
        await carsController.CreateCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: createCarsDTO });
        expect(carsController.carsService.CreateCar).toHaveBeenCalledWith(
            createCarsDTO
        );
    });

    it('should return 400 with error message when carsService throws an error', async () => {
        // Arrange
        const errorMessage = 'Error creating car';
        jest.spyOn(res, 'status').mockReturnThis();
        jest.spyOn(res, 'send').mockReturnValueOnce(res as Response);
        jest.spyOn(
            carsController.carsService,
            'CreateCar'
        ).mockRejectedValueOnce(new Error(errorMessage));

        // Act
        await carsController.CreateCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(carsController.carsService.CreateCar).toHaveBeenCalledWith(
            createCarsDTO
        );
    });
});

describe('GetAllCars', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let carsService: jest.Mocked<CarsService>;
    let carsController: CarsController;

    beforeEach(() => {
        req = {
            query: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        carsService = {
            GetAllCars: jest.fn().mockReturnValue(
                Promise.resolve([
                    {
                        id: 1,
                        carModel: 'Toyota',
                        color: 'Blue',
                        year: 2019,
                        value_per_day: 100,
                        accessories: [],
                        number_of_passengers: 5,
                    },
                    {
                        id: 2,
                        carModel: 'Honda',
                        color: 'Red',
                        year: 2020,
                        value_per_day: 90,
                        accessories: [],
                        number_of_passengers: 5,
                    },
                    {
                        id: 3,
                        carModel: 'Ford',
                        color: 'Green',
                        year: 2018,
                        value_per_day: 120,
                        accessories: [],
                        number_of_passengers: 5,
                    },
                ])
            ),
        } as unknown as jest.Mocked<CarsService>;

        carsController = new CarsController();
        carsController.carsService = carsService;
    });

    it('should return 200 with all cars', async () => {
        // Arrange

        // Act
        await carsController.GetAllCars(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data: [
                {
                    id: 1,
                    carModel: 'Toyota',
                    color: 'Blue',
                    year: 2019,
                    value_per_day: 100,
                    accessories: [],
                    number_of_passengers: 5,
                },
                {
                    id: 2,
                    carModel: 'Honda',
                    color: 'Red',
                    year: 2020,
                    value_per_day: 90,
                    accessories: [],
                    number_of_passengers: 5,
                },
                {
                    id: 3,
                    carModel: 'Ford',
                    color: 'Green',
                    year: 2018,
                    value_per_day: 120,
                    accessories: [],
                    number_of_passengers: 5,
                },
            ],
        });
        expect(carsController.carsService.GetAllCars).toHaveBeenCalled();
    });
});

describe('DeleteCar', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let carsService: jest.Mocked<CarsService>;
    let carsController: CarsController;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        carsService = {
            DeleteCarById: jest.fn(),
        } as unknown as jest.Mocked<CarsService>;

        carsController = new CarsController();
        carsController.carsService = carsService;
    });

    it('should return 204 when car is successfully deleted', async () => {
        // Arrange

        // Act
        await carsController.DeleteCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
        expect(carsService.DeleteCarById).toHaveBeenCalledWith('1');
    });

    it('should return 404 with error message when car is not found', async () => {
        // Arrange
        const errorMessage = 'Car with ID 1 not found';
        const error = new Error(errorMessage);
        carsService.DeleteCarById.mockRejectedValue(error);

        // Act
        await carsController.DeleteCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(carsService.DeleteCarById).toHaveBeenCalledWith('1');
    });

    it('should return 400 with error message for invalid ID format', async () => {
        // Arrange
        const errorMessage = 'Invalid ID format';
        const error = new Error(errorMessage);
        carsService.DeleteCarById.mockRejectedValue(error);

        // Act
        await carsController.DeleteCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(carsService.DeleteCarById).toHaveBeenCalledWith('1');
    });
});

describe('UpdateCar', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let carsService: jest.Mocked<CarsService>;
    let carsController: CarsController;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
            body: {
                id: '2',
                carModel: 'Honda',
                color: 'Red',
                year: '2020',
                value_per_day: 90,
                accessories: [],
                number_of_passengers: 5,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        carsService = {
            UpdateCarById: jest.fn(),
        } as unknown as jest.Mocked<CarsService>;

        carsController = new CarsController();
        carsController.carsService = carsService;
    });

    it('should return 200 with updated car', async () => {
        // Arrange
        const updatedCar = {
            id: '2',
            carModel: 'Honda',
            color: 'Red',
            year: '2020',
            value_per_day: 90,
            accessories: [] as ICar['accessories'],
            number_of_passengers: 5,
        };
        carsService.UpdateCarById.mockResolvedValue(updatedCar as ICar);

        // Act
        await carsController.UpdateCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedCar);
        expect(carsService.UpdateCarById).toHaveBeenCalledWith(
            '1',
            req.body as CreateCarsDTO
        );
    });

    it('should return 404 with error message when car is not found', async () => {
        // Arrange
        const errorMessage = 'Car with ID 1 not found';
        const error = new Error(errorMessage);
        carsService.UpdateCarById.mockRejectedValue(error);

        // Act
        await carsController.UpdateCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(carsService.UpdateCarById).toHaveBeenCalledWith(
            '1',
            req.body as CreateCarsDTO
        );
    });

    it('should return 400 with error message for invalid ID format', async () => {
        // Arrange
        const errorMessage = 'Invalid ID format: 1';
        const error = new Error(errorMessage);
        carsService.UpdateCarById.mockRejectedValue(error);

        // Act
        await carsController.UpdateCar(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(carsService.UpdateCarById).toHaveBeenCalledWith(
            '1',
            req.body as CreateCarsDTO
        );
    });
});

describe('GetCar', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let carsService: jest.Mocked<CarsService>;
    let carsController: CarsController;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        carsService = {
            GetCarById: jest.fn().mockResolvedValue({
                id: 1,
                carModel: 'Honda',
                color: 'Red',
                year: 2020,
                value_per_day: 90,
                accessories: [],
                number_of_passengers: 5,
            }),
        } as unknown as jest.Mocked<CarsService>;

        carsController = new CarsController();
        carsController.carsService = carsService;
    });

    it('should get car by ID', async () => {
        await carsController.GetCar(req as Request, res as Response);

        expect(carsService.GetCarById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data: {
                id: 1,
                carModel: 'Honda',
                color: 'Red',
                year: 2020,
                value_per_day: 90,
                accessories: [],
                number_of_passengers: 5,
            },
        });
    });

    it('should handle error if car not found', async () => {
        carsService.GetCarById.mockRejectedValueOnce(
            new Error('Car with ID 1 not found')
        );

        await carsController.GetCar(req as Request, res as Response);

        expect(carsService.GetCarById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Car with ID 1 not found',
        });
    });

    it('should handle other errors', async () => {
        carsService.GetCarById.mockRejectedValueOnce(
            new Error('Some error occurred')
        );

        await carsController.GetCar(req as Request, res as Response);

        expect(carsService.GetCarById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Some error occurred',
        });
    });
});
