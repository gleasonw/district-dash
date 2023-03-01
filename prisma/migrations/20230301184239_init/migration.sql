-- CreateTable
CREATE TABLE "School" (
    "X" DOUBLE PRECISION NOT NULL,
    "Y" DOUBLE PRECISION NOT NULL,
    "OBJECTID" INTEGER NOT NULL,
    "NCESSCH" INTEGER NOT NULL,
    "SURVYEAR" TEXT NOT NULL,
    "STABR" TEXT NOT NULL,
    "LEAID" INTEGER NOT NULL,
    "ST_LEAID" TEXT NOT NULL,
    "LEA_NAME" TEXT NOT NULL,
    "SCH_NAME" TEXT NOT NULL,
    "LSTREET1" TEXT NOT NULL,
    "LSTREET2" TEXT NOT NULL,
    "LCITY" TEXT NOT NULL,
    "LSTATE" TEXT NOT NULL,
    "LZIP" INTEGER NOT NULL,
    "LZIP4" INTEGER NOT NULL,
    "PHONE" TEXT NOT NULL,
    "GSLO" TEXT NOT NULL,
    "GSHI" TEXT NOT NULL,
    "VIRTUAL" TEXT NOT NULL,
    "TOTFRL" INTEGER NOT NULL,
    "FRELCH" INTEGER NOT NULL,
    "REDLCH" INTEGER NOT NULL,
    "PK" INTEGER NOT NULL,
    "KG" INTEGER NOT NULL,
    "G01" INTEGER NOT NULL,
    "G02" INTEGER NOT NULL,
    "G03" INTEGER NOT NULL,
    "G04" INTEGER NOT NULL,
    "G05" INTEGER NOT NULL,
    "G06" INTEGER NOT NULL,
    "G07" INTEGER NOT NULL,
    "G08" INTEGER NOT NULL,
    "G09" INTEGER NOT NULL,
    "G10" INTEGER NOT NULL,
    "G11" INTEGER NOT NULL,
    "G12" INTEGER NOT NULL,
    "G13" INTEGER NOT NULL,
    "TOTAL" INTEGER NOT NULL,
    "MEMBER" INTEGER NOT NULL,
    "AM" INTEGER NOT NULL,
    "HI" INTEGER NOT NULL,
    "BL" INTEGER NOT NULL,
    "WH" INTEGER NOT NULL,
    "HP" INTEGER NOT NULL,
    "TR" INTEGER NOT NULL,
    "FTE" DOUBLE PRECISION NOT NULL,
    "LATCOD" DOUBLE PRECISION NOT NULL,
    "LONCOD" DOUBLE PRECISION NOT NULL,
    "ULOCALE" TEXT NOT NULL,
    "NMCNTY" TEXT NOT NULL,
    "STUTERATIO" DOUBLE PRECISION NOT NULL,
    "TITLEI" TEXT NOT NULL,
    "STITLEI" TEXT NOT NULL,
    "AMALM" INTEGER NOT NULL,
    "AMALF" INTEGER NOT NULL,
    "ASALM" INTEGER NOT NULL,
    "ASALF" INTEGER NOT NULL,
    "HIALM" INTEGER NOT NULL,
    "HIALF" INTEGER NOT NULL,
    "BLALM" INTEGER NOT NULL,
    "BLALF" INTEGER NOT NULL,
    "WHALM" INTEGER NOT NULL,
    "WHALF" INTEGER NOT NULL,
    "HPALM" INTEGER NOT NULL,
    "HPALF" INTEGER NOT NULL,
    "TRALM" INTEGER NOT NULL,
    "TRALF" INTEGER NOT NULL,
    "TOTMENROL" INTEGER NOT NULL,
    "TOTFENROL" INTEGER NOT NULL,
    "STATUS" INTEGER NOT NULL,
    "UG" TEXT NOT NULL,
    "AE" TEXT NOT NULL,
    "SCHOOL_TYPE_TEXT" TEXT NOT NULL,
    "SY_STATUS_TEXT" TEXT NOT NULL,
    "SCHOOL_LEVEL" TEXT NOT NULL,
    "AS" INTEGER NOT NULL,
    "CHARTER_TEXT" BOOLEAN NOT NULL,
    "MAGNET_TEXT" BOOLEAN NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("OBJECTID")
);

-- CreateTable
CREATE TABLE "District" (
    "OBJECTID" INTEGER NOT NULL,
    "SURVYEAR" TEXT NOT NULL,
    "STABR" TEXT NOT NULL,
    "STATENAME" TEXT NOT NULL,
    "LEAID" INTEGER NOT NULL,
    "ST_LEAID" TEXT NOT NULL,
    "LEA_NAME" TEXT NOT NULL,
    "LSTREET1" TEXT NOT NULL,
    "LSTREET2" TEXT NOT NULL,
    "LCITY" TEXT NOT NULL,
    "LSTATE" TEXT NOT NULL,
    "LZIP" INTEGER NOT NULL,
    "LZIP4" INTEGER NOT NULL,
    "LEA_TYPE_TEXT" TEXT NOT NULL,
    "LEA_TYPE" INTEGER NOT NULL,
    "GSLO" TEXT NOT NULL,
    "GSHI" INTEGER NOT NULL,
    "SY_STATUS_TEXT" TEXT NOT NULL,
    "SCH" INTEGER NOT NULL,
    "TOTTCH" INTEGER NOT NULL,
    "STUTERATIO" DOUBLE PRECISION NOT NULL,
    "LOCALE" INTEGER NOT NULL,
    "LOCALE_TEXT" TEXT NOT NULL,
    "CONAME" TEXT NOT NULL,
    "COID" INTEGER NOT NULL,
    "PHONE" TEXT NOT NULL,
    "Lat" DOUBLE PRECISION NOT NULL,
    "Long" DOUBLE PRECISION NOT NULL,
    "MEMBER" INTEGER NOT NULL,
    "Shape__Area" DOUBLE PRECISION NOT NULL,
    "Shape__Length" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("OBJECTID")
);