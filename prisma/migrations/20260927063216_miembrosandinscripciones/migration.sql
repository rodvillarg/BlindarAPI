-- CreateTable
CREATE TABLE `miembros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `correo` VARCHAR(150) NOT NULL,
    `membresia` VARCHAR(20) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `miembros_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscripciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horarioId` INTEGER NOT NULL,
    `miembroId` INTEGER NOT NULL,
    `estado` ENUM('confirmada', 'cancelada') NOT NULL DEFAULT 'confirmada',
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Inscripciones_miembroId_idx`(`miembroId`),
    UNIQUE INDEX `Inscripciones_horarioId_miembroId_key`(`horarioId`, `miembroId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inscripciones` ADD CONSTRAINT `Inscripciones_horarioId_fkey` FOREIGN KEY (`horarioId`) REFERENCES `horarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscripciones` ADD CONSTRAINT `Inscripciones_miembroId_fkey` FOREIGN KEY (`miembroId`) REFERENCES `miembros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
