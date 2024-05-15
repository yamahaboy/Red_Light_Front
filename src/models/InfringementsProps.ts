export type InfringementsProps = {
    id: number;
    created_at: number;
    modified_at: number;
    ts: number;
    is_red_traffic_light_detected: boolean;
    road_frame_filename: string;
    full_frame_filename: string;
    road_frame_blob?: Blob; 
    full_frame_blob?: Blob;
}

export type InfringementsPropsResponse = {
    data: InfringementsProps[],
    count: number
}