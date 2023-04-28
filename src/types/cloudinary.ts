interface CloudinaryResourcesResponseDTO {
  last_updated: { context_updated_at?: string; tags_updated_at?: string; updated_at: string };
  format: string;
  resource_type: string;
  secure_url: string;
  created_at: string;
  asset_id: string;
  type: string;
  version: number;
  url: string;
  public_id: string;
  folder: string;
  bytes: number;
  tags: Array<string>;
  width: number;
  context?: { custom?: { alt?: string; caption?: string } };
  height: number;
}

interface CloudinaryResourcesWithOrder extends CloudinaryResourcesResponseDTO {
  order: number;
}

export interface CloudinaryResourcesByTagResponseDTO {
  resources: Array<CloudinaryResourcesResponseDTO>;
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
}

export interface CloudinaryResourcesByTagResponseWithOrderDTO extends CloudinaryResourcesByTagResponseDTO {
  resources: Array<CloudinaryResourcesWithOrder>;
}

export interface SortedResourcesData extends Omit<CloudinaryResourcesByTagResponseDTO, 'resources'> {
  resources: Array<CloudinaryResourcesWithOrder | Array<CloudinaryResourcesWithOrder>>;
}
