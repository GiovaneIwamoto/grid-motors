import { Request, Response } from 'express';
import { CreateReserveDTO, UpdateReserveDTO } from '../../src/DTO';
import { ReservesService } from '../../src/services';
import ReservesController from '../../src/controllers/ReservesController';
import { IReserve } from '../../src/models/Reserves';
import { UsersController } from '../../src/controllers';

describe('CreateReserve', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let createReserveDTO: CreateReserveDTO;
    let reservesService: jest.Mocked<ReservesService>;
    let reservesController: ReservesController;

    beforeEach(() => {
        req = {
            body: {
                start_date: '2023-04-11',
                end_date: '2023-04-15',
                id_car: '2',
            },
            headers: {
                authorization: 'Bearer token123',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        createReserveDTO = {
            start_date: new Date('2023-04-11T00:00:00.000Z'),
            end_date: new Date('2023-04-15T00:00:00.000Z'),
            id_car: '2',
        };
        reservesService = {
            CreateReserve: jest
                .fn()
                .mockResolvedValue(Promise.resolve(createReserveDTO)),
        } as unknown as jest.Mocked<ReservesService>;

        reservesController = new ReservesController();
        reservesController.reservesService = reservesService;
    });

    it('should create a reserve', async () => {
        // Arrange
        jest.spyOn(res, 'status').mockReturnThis();
        jest.spyOn(res, 'json').mockReturnValueOnce(res as Response);
        jest.spyOn(
            reservesController.reservesService,
            'CreateReserve'
        ).mockReturnValue(Promise.resolve(createReserveDTO as IReserve));

        // Act
        await reservesController.CreateReserve(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: createReserveDTO });
    });

    it('should handle error if car not found', async () => {
        reservesService.CreateReserve.mockRejectedValueOnce(
            new Error('Car with ID: 2 not found')
        );

        await reservesController.CreateReserve(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Car with ID: 2 not found',
        });
    });

    it('should handle error if user is not qualified to create a reservation', async () => {
        reservesService.CreateReserve.mockRejectedValueOnce(
            new Error('User is not qualified to create a reservation')
        );

        await reservesController.CreateReserve(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: 'User is not qualified to create a reservation',
        });
    });
});

describe('GetAllReserves', () => {
    let reservesController: ReservesController;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let reservesService: jest.Mocked<ReservesService>;

    beforeEach(() => {
        req = {
            query: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };

        reservesService = {
            GetAllReserves: jest.fn().mockReturnValue(
                Promise.resolve([
                    {
                        id_user: 1,
                        start_date: '10/10/2022',
                        end_date: '10/15/2022',
                        id_car: 2,
                        final_value: 100,
                    },
                    {
                        id_user: 2,
                        start_date: '10/11/2022',
                        end_date: '10/16/2022',
                        id_car: 3,
                        final_value: 150,
                    },
                ])
            ),
        } as unknown as jest.Mocked<ReservesService>;

        reservesController = new ReservesController();
        reservesController.reservesService = reservesService;
    });

    it('should get all reserves without query params', async () => {
        await reservesController.GetAllReserves(
            req as Request,
            res as Response
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data: [
                {
                    id_user: 1,
                    start_date: '10/10/2022',
                    end_date: '10/15/2022',
                    id_car: 2,
                    final_value: 100,
                },
                {
                    id_user: 2,
                    start_date: '10/11/2022',
                    end_date: '10/16/2022',
                    id_car: 3,
                    final_value: 150,
                },
            ],
        });
        expect(
            reservesController.reservesService.GetAllReserves
        ).toHaveBeenCalled();
    });

    it('should get all reserves with query params', async () => {
        // Arrange
        req.query = { param1: 'value1', param2: 'value2' };
        jest.spyOn(
            reservesController.reservesService,
            'GetAllReserves'
        ).mockReturnValueOnce(Promise.resolve([]));

        // Act
        await reservesController.GetAllReserves(
            req as Request,
            res as Response
        );

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: [] });
        expect(res.send).not.toHaveBeenCalled();
        expect(
            reservesController.reservesService.GetAllReserves
        ).toHaveBeenCalledWith({ param1: 'value1', param2: 'value2' });
    });

    it('should handle error and send error response', async () => {
        // Arrange
        const errorMessage = 'Error fetching reserves';
        jest.spyOn(
            reservesController.reservesService,
            'GetAllReserves'
        ).mockRejectedValueOnce(new Error(errorMessage));

        // Act
        await reservesController.GetAllReserves(
            req as Request,
            res as Response
        );

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(res.json).not.toHaveBeenCalled();
        expect(
            reservesController.reservesService.GetAllReserves
        ).toHaveBeenCalledWith();
    });
});

describe('DeleteReserve', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let reservesService: jest.Mocked<ReservesService>;
    let reservesController: ReservesController;

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
        reservesService = {
            DeleteReserveById: jest.fn(),
        } as unknown as jest.Mocked<ReservesService>;

        reservesController = new ReservesController();
        reservesController.reservesService = reservesService;
    });

    it('should return 204 when reserve is successfully deleted', async () => {
        // Arrange

        // Act
        await reservesController.DeleteReserve(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
        expect(reservesService.DeleteReserveById).toHaveBeenCalledWith('1');
    });

    it('should return 400 with error message for invalid ID format', async () => {
        // Arrange
        const errorMessage = 'Invalid ID format';
        const error = new Error(errorMessage);
        reservesService.DeleteReserveById.mockRejectedValue(error);

        // Act
        await reservesController.DeleteReserve(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(reservesService.DeleteReserveById).toHaveBeenCalledWith('1');
    });
});

describe('UpdateReserve', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let reservesService: jest.Mocked<ReservesService>;
    let reservesController: ReservesController;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
            body: {
                id_user: '1',
                start_date: '10/11/2022',
                end_date: '10/16/2022',
                id_car: '10',
                final_value: 150,
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        reservesService = {
            UpdateReserveById: jest.fn(),
        } as unknown as jest.Mocked<ReservesService>;

        reservesController = new ReservesController();
        reservesController.reservesService = reservesService;
    });

    it('should return 200 with updated reserve', async () => {
        // Arrange
        const updatedReserve = {
            id_user: '1',
            start_date: new Date('10/11/2022'),
            end_date: new Date('10/16/2022'),
            id_car: '10',
            final_value: 150,
        };
        reservesService.UpdateReserveById.mockResolvedValue(
            updatedReserve as IReserve
        );

        // Act
        await reservesController.UpdateReserve(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedReserve);
        expect(reservesService.UpdateReserveById).toHaveBeenCalledWith(
            '1',
            req.body as CreateReserveDTO
        );
    });

    it('should return 404 with error message when reserve is not found', async () => {
        // Arrange
        const errorMessage = 'Reserve with ID 1 not found';
        const error = new Error(errorMessage);
        reservesService.UpdateReserveById.mockRejectedValue(error);

        // Act
        await reservesController.UpdateReserve(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(reservesService.UpdateReserveById).toHaveBeenCalledWith(
            '1',
            req.body as CreateReserveDTO
        );
    });

    it('should return 400 with error message for invalid ID format', async () => {
        // Arrange
        const errorMessage = 'Invalid ID format: 1';
        const error = new Error(errorMessage);
        reservesService.UpdateReserveById.mockRejectedValue(error);

        // Act
        await reservesController.UpdateReserve(req as Request, res as Response);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
        expect(reservesService.UpdateReserveById).toHaveBeenCalledWith(
            '1',
            req.body as CreateReserveDTO
        );
    });
});

describe('GetReserve', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let reservesService: jest.Mocked<ReservesService>;
    let reservesController: ReservesController;

    beforeEach(() => {
        req = {
            params: {
                id: '10',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        reservesService = {
            GetReserveById: jest.fn().mockResolvedValue({
                id: '10',
                id_user: '1',
                start_date: '10/11/2022',
                end_date: '10/16/2022',
                id_car: '10',
                final_value: 150,
            }),
        } as unknown as jest.Mocked<ReservesService>;

        reservesController = new ReservesController();
        reservesController.reservesService = reservesService;
    });

    it('should get reserve by ID', async () => {
        await reservesController.GetReserve(req as Request, res as Response);

        expect(reservesService.GetReserveById).toHaveBeenCalledWith('10');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data: {
                id: '10',
                id_user: '1',
                start_date: '10/11/2022',
                end_date: '10/16/2022',
                id_car: '10',
                final_value: 150,
            },
        });
    });

    it('should handle error if reserve not found', async () => {
        reservesService.GetReserveById.mockRejectedValueOnce(
            new Error('Reserve with ID 10 not found')
        );

        await reservesController.GetReserve(req as Request, res as Response);

        expect(reservesService.GetReserveById).toHaveBeenCalledWith('10');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Reserve with ID 10 not found',
        });
    });

    it('should handle other errors', async () => {
        reservesService.GetReserveById.mockRejectedValueOnce(
            new Error('Some error occurred')
        );

        await reservesController.GetReserve(req as Request, res as Response);

        expect(reservesService.GetReserveById).toHaveBeenCalledWith('10');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Some error occurred',
        });
    });
});
