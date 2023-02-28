export interface NCESPublicSchoolCharacteristics {
    OBJECTID: number;
    PHONE?: string;
    VIRTUAL?: string;
    MEMBER?: number;
    STUTERATIO?: number;
    ULOCALE?: string;
    TOTFRL?: number;
  }
  
  export interface NCESDistrictCharacteristics {
    OBJECTID: number;
    LEA_TYPE_TEXT?: string;
    SCH?: number;
    STUTERATIO?: number;
    PHONE?: string;
    MEMBER?: number;
    LOCALE_TEXT?: string;
  }
  
  export interface NCESSchoolFeatureAttributes {
    FID?: number;
    NCESSCH?: string;
    LEAID?: string;
    NAME?: string;
    OPSTFIPS?: string;
    STREET?: string;
    CITY?: string;
    STATE?: string;
    ZIP?: string;
    STFIP?: string;
    CNTY?: string;
    NMCNTY?: string;
    LOCALE?: string;
    LAT?: number;
    LON?: number;
    CBSATYPE?: number;
    ISPUBLIC?: boolean;
  }
  
  export interface NCESSchoolFeature {
    attributes?: NCESSchoolFeatureAttributes;
    geometry?: {
      x: number;
      y: number;
    };
  }
  
  export interface NCESDistrictFeatureAttributes {
    OBJECTID: number;
    LEAID: string;
    NAME: string;
    OPSTFIPS: string;
    LSTREE: string;
    LCITY: string;
    LSTATE: string;
    LZIP: string;
    LZIP4: string;
    STFIP15: string;
    CNTY15: string;
    NMCNTY15: string;
    LAT1516: number;
    LON1516: number;
    CBSA15: string;
    NMCBSA15: string;
    CBSATYPE15: string;
    CSA15: string;
    NMCSA15: string;
    NECTA15: string;
    NMNECTA15: string;
    CD15: string;
    SLDL15: string;
    SLDU15: string;
  }
  
  interface NCESDistrictFeature {
    attributes?: NCESDistrictFeatureAttributes;
    geometry?: {
      x: number;
      y: number;
    };
  }
  
  const searchSchoolDistricts = async (
    name: string | null
  ): Promise<NCESDistrictFeatureAttributes[]> => {
    if (!name) return [];
    let publicSchoolEndpoint = `https://nces.ed.gov/opengis/rest/services/K12_School_Locations/EDGE_GEOCODE_PUBLICLEA_1516/MapServer/0/query?where=UPPER(NAME)+LIKE+UPPER(%27%25${name}%25%27)&orderByFields=NAME&resultRecordCount=20&f=json&outfields=*&outSR=4326`;
    let combinedData = [];
    let publicResponse = await (await fetch(publicSchoolEndpoint)).json();
  
    combinedData = [
      ...(publicResponse.features
        ? publicResponse.features.map((feature: NCESDistrictFeature) => {
          return feature.attributes;
        })
        : []),
    ];
    return combinedData;
  };
  
  const searchSchools = async (
    name: string,
    district?: string
  ): Promise<NCESSchoolFeature[]> => {
    let baseEndPoint =
      "https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services";
    let metaArgs = `&outFields=*&outSR=4326&f=json&resultRecordCount=10`;
    let whereClause = `FeatureServer/0/query?where=UPPER(NAME)+LIKE+UPPER(%27%25${name}%25%27)`;
    let districtClause = `%20AND%20LEAID%20%3D%20'${district}'`;
  
    let privateSchoolEndpoint = `${baseEndPoint}/Private_School_Locations_Current/${whereClause}${metaArgs}`;
    let publicSchoolEndpoint = `${baseEndPoint}/Public_School_Location_201819/${whereClause}${district ? districtClause : ""
      }${metaArgs}`;
  
    let publicResponse = await (await fetch(publicSchoolEndpoint)).json();
    let combinedData = [];
    let privateResponse = district ? [] : await (await fetch(privateSchoolEndpoint)).json();
  
    combinedData = [
      ...(privateResponse.features ? addPublicFlag(privateResponse.features, false) : []),
      ...(publicResponse.features ? addPublicFlag(publicResponse.features, true) : []),
    ];
  
    function addPublicFlag(features: NCESSchoolFeature[], isPublic: boolean) {
      return features.map((feature: NCESSchoolFeature) => {
        return {
          ...feature,
          attributes: {
            ...feature.attributes,
            ISPUBLIC: isPublic,
          },
        };
      });
    }
  
  
    return processSchoolNames(combinedData);
  };
  
  function processSchoolNames(features: NCESSchoolFeature[]) {
    /**
     * NCES school names are often upper case, and many share names.
     * Add city/state and make names title case. 
     */
    function nameToTitleCase(name: string | undefined) {
      if (!name) return name;
      return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
    return features.map((feature) => {
      return {
        ...feature,
        attributes: feature.attributes && {
          ...feature.attributes,
          NAME: `${nameToTitleCase(feature.attributes.NAME)} (${feature.attributes.CITY}, ${feature.attributes.STATE})`,
        },
      };
    });
  }
  
  const getPublicSchoolMetadata = async (
    objectID: number | undefined
  ): Promise<NCESPublicSchoolCharacteristics | undefined> => {
    const baseEndPoint =
      "https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services/School_Characteristics_Current/FeatureServer/2/";
    const whereClause = `query?where=OBJECTID=%27${objectID}%27`;
  
    return doMetadataFetch(`${baseEndPoint}${whereClause}`);
  };
  
  const getDistrictMetadata = async (
    LEAID: string
  ): Promise<NCESDistrictCharacteristics | undefined> => {
    const baseEndPoint =
      "https://services1.arcgis.com/Ua5sjt3LWTPigjyD/arcgis/rest/services/School_District_Characteristics_Current/FeatureServer/0/";
    const whereClause = `query?where=LEAID=%27${LEAID}%27`;
  
    return doMetadataFetch(`${baseEndPoint}/${whereClause}`);
  };
  
  const doMetadataFetch = async (url: string) => {
    const metaArgs = "&outFields=*&f=json";
    const response = await (await fetch(`${url}${metaArgs}`)).json();
    if (response.features && response.features.length > 0) {
      return response.features[0].attributes;
    }
  };
  
  export {
    searchSchoolDistricts,
    searchSchools,
    getPublicSchoolMetadata,
    getDistrictMetadata,
  };
  